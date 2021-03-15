[toc]

# 第12章 pandas高级应用

本章就要深⼊学习pandas的⾼级功能。

## 12.1 分类数据

pandas的分类类型。我会向你展示通过使⽤它，提⾼性能和内存的使⽤率。我还会介绍⼀些在统计和机器学习中使⽤分类数据的⼯具。

问题背景和目的：

表中的⼀列通常会有重复的包含不同值的⼩集合的情况。我们已经学过了unique和value_counts，它们可以**从数组提取出不同的值，并分别计算频率**。

`take`

~~~python
import numpy as np; import pandas as pd
values = pd.Series(['apple', 'orange', 'apple',
                    'apple'] * 2)
values
pd.unique(values)
pd.value_counts(values)
#——————————————————————————
#用途：更映射有点类似，apply
values = pd.Series([0, 1, 0, 0] * 2)
dim = pd.Series(['apple', 'orange'])
dim.take(values)
~~~

:spider_web:重命名分类。加⼊⼀个新的分类，不改变已经存在的分类的顺序或位置。

#### pandas的分类类型(Categorical Type in pandas)

pandas有⼀个特殊的分类类型，⽤于保存使⽤整数分类表示法的数据。

~~~python
fruits = ['apple', 'orange', 'apple', 'apple'] * 2
N = len(fruits)
df = pd.DataFrame({'fruit': fruits,
                   'basket_id': np.arange(N),
                   'count': np.random.randint(3, 15, size=N),
                   'weight': np.random.uniform(0, 4, size=N)},
                  columns=['basket_id', 'fruit', 'count', 'weight'])
#pandas.Categorical实例,定义成categorical好像意义不大
fruit_cat = df['fruit'].astype('category')
fruit_cat
#分类对象category有categories和codes属性
c = fruit_cat.values
c.categories
c.codes
#categorical对象
my_categories = pd.Categorical(['foo', 'bar', 'baz', 'foo', 'bar'])
#⽆序的分类实例可以通过as_ordered排序
categories = ['foo', 'bar', 'baz']
codes = [0, 1, 2, 0, 0, 1]
ordered_cat = pd.Categorical.from_codes(codes, categories,
                                        ordered=True)
#my_cats_2.as_ordered()
ordered_cat
~~~

#### 用分类进行计算（Computations with Categoricals）

使⽤pandas.qcut⾯元函数，它会返回pandas.Categorical。计算这个数据的分位⾯元，提取⼀些统计信息。（注意qcut是数量一样的间距，而cut是间距一样）

~~~python
np.random.seed(12345)
draws = np.random.randn(1000)
bins = pd.qcut(draws, 4, labels=['Q1', 'Q2', 'Q3', 'Q4'])
bins
bins = pd.Series(bins, name='quartile')
results = (pd.Series(draws)
           .groupby(bins)
           .agg(['count', 'min', 'max'])
           .reset_index())
results['quartile']
~~~

#### 用分类提高性能（Better performance with categoricals）

在⼀个特定数据集上做⼤量分析，将其转换为分类可以极大地提⾼效率。DataFrame列的分类使⽤的内存通常少的多。

下面我们会处理包含⼀千万元素的Series，和⼀些不同的分类

~~~python
N = 10000000
draws = pd.Series(np.random.randn(N))
labels = pd.Series(['foo', 'bar', 'baz', 'qux'] * (N // 4))
categories = labels.astype('category')
#查看转换时间（转换为分类不是没有代价的，但这是⼀次性的代价)
%time _ = labels.astype('category')
#下面可以分别来看一下常规列和category的内存占用情况
labels.memory_usage()
categories.memory_usage()
#标签使⽤的内存远⽐分类多
~~~

#### 分类方法（Categorical Methods）

包含分类数据的Series有⼀些特殊的方法，类似于Series.str字符串方法。它还提供了方便的分类和编码的使⽤方法。

~~~python
s = pd.Series(['a', 'b', 'c', 'd'] * 2)
cat_s = s.astype('category')
#查看cat_s的两种属性，cat属性提供了分类方法的入口
cat_s.values.codes
cat_s.cat.categories
#这个数据的实际分类集，超出了数据中的四个值。我们可以使⽤set_categories⽅法改变它们
actual_categories = ['a', 'b', 'c', 'd', 'e']
#set_categories作用是改变实际的分类值
cat_s2 = cat_s.cat.set_categories(actual_categories)
cat_s.value_counts()
cat_s2.value_counts()

#使⽤remove_unused_categories⽅法删除没看到的分类
cat_s3 = cat_s[cat_s.isin(['a', 'b'])]
cat_s3
cat_s3.cat.remove_unused_categories()
~~~

![1](F:\github_desktop\github文件路径\books\python-for-data-analysis_2nd\chapter 12 pictures\1.png)

:spider_web:这种category类型用不用都可以，只是作为节省内存和⾼性能的便捷⼯具。高手操作

:spider_web:列转换为category类型的基础上，后面都是category基础上的一系列操作。

#### 为建模创建虚拟变量（Creating dummy variables for modeling）

当你使⽤统计或机器学习⼯具时，通常会将分类数据转换为虚拟变量，也称为one-hot编码。

~~~python
cat_s = pd.Series(['a', 'b', 'c', 'd'] * 2, dtype='category')
#one-hot编码
pd.get_dummies(cat_s)
~~~

## 12.2 GroupBy高级应用（Advanced GroupBy Use）

结合第十章种series和dataFrame中groupby方法。

#### 分组转换和“解封”GroupBy（Group Transforms and "Unwrapped" GroupBys)

在第10章，我们在分组操作中学习了apply⽅法，进⾏转换。还有另⼀个transform⽅法，它与apply很像，但是对使⽤的函数有⼀定限制：

* 它可以产⽣向分组形状⼴播标量值
* 它可以产⽣⼀个和输⼊组形状相同的对象
* 它不能修改输⼊

~~~python
df = pd.DataFrame({'key': ['a', 'b', 'c'] * 4,
                   'value': np.arange(12.)})
g = df.groupby('key').value
g.mean()
#与apply类似，transform的函数会返回Series，但是结果必须与输⼊⼤⼩相同。
g.transform(lambda x: x.mean())
g.transform('mean')
#value*value
g.transform(lambda x: x * 2)
#计算每个分组(abcd)的降序排名
g.transform(lambda x: x.rank(ascending=False))
#分组标准化
def normalize(x):
    return (x - x.mean()) / x.std()
#method1
g.transform(normalize)
#method2
g.apply(normalize)
#method3
normalized = (df['value'] - g.transform('mean')) / g.transform('std')
normalized
~~~

:thinking:爬虫中，常用json格式文件，我们可以利用key来做一些工作

#### 分组的时间重采样(Grouped Time Resampling)

对于时间序列数据，resample（第十一章内容）方法从语义上是⼀个基于内在时间的分组操作。

~~~python
N = 15
times = pd.date_range('2017-05-20 00:00', freq='1min', periods=N)
df = pd.DataFrame({'time': times,
                   'value': np.arange(N)})
#将time作为索引，对（] 做5min的计数
#可以⽤time作为索引，然后重采样
df.set_index('time').resample('5min').count()
#DataFrame包含多个时间序列，⽤⼀个额外的分组键key的列进⾏标记
df2 = pd.DataFrame({'time': times.repeat(3),
                    'key': np.tile(['a', 'b', 'c'], N),
                    'value': np.arange(N * 3.)})

~~~

:spider_web:在python3.6中无time_key = pd.TimeGrouper('5min')

## 12.3 链式编程技术（Techniques for Method Chaining）

对数据集进行一系列变换时，你可能发现创建的多个临时变量其实并没有在分析中用到。

~~~python
df = load_data()
df2 = df[df['col2'] < 0]
df2['col1_demeaned'] = df2['col1'] - df2['col1'].mean()
result = df2.groupby('key').col1_demeaned.std()
#上面的中间变量有一些没有用到
result = (df2.assign(col1_demeaned=df2.col1 - df2.col2.mean())
          .groupby('key')
          .col1_demeaned.std())
~~~

#### 管道方法（The pipe Method）

假设你想转换多列，并修改分组的键。另外，你想用链式编程做这个转换。

~~~python
def group_demean(df, by, cols):
    result = df.copy()
    g = df.groupby(by)
    for c in cols:
        result[c] = df[c] - g[c].transform('mean')
    return result
result = (df[df.col1 < 0]
          .pipe(group_demean, ['key1', 'key2'], ['col1']))
~~~

## 12.4总结

深⼊学习pandas的知识，我建议你学习官⽅⽂档，并阅读开发团队发布的更新⽂档。我们还邀请你加⼊pandas的开发⼯作：修改bug、创建新功能、完善⽂档。