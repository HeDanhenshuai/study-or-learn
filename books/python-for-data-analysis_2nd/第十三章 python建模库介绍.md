[toc]



# 第13章 Python建模库介绍

Python数据分析的编程基础。因为数据分析师和科学家总是在数据规整和准备上花费⼤量时间，这本书的重点在于掌握这些功能。我是极其同意这句话的。

开发模型选⽤什么库取决于应⽤本身。许多统计问题可以⽤简单⽅法解决，⽐如普通的最⼩⼆乘回归，其它问题可能需要复杂的机器学习⽅法。幸运的是，Python已经成为了运⽤这些分析⽅法的语⾔之⼀，因此读完此书，你可以探索许多⼯具。

**简短介绍两个流⾏的建模⼯具，statsmodels和scikit-learn。**

**本书中学习的数据聚合和GroupBy⼯具常⽤于特征⼯程中。**

## 13.1 pandas与模型代码的接口（Interfacing Between pandas and Model Code）

**将DataFrame转换为NumPy数组，可以使用.values属性**

~~~python
import pandas as pd
import numpy as np
data = pd.DataFrame({
    'x0': [1, 2, 3, 4, 5],
    'x1': [0.01, -0.01, 0.25, -4.1, 0.],
    'y': [-1.5, 0., 3.6, 1.3, -2.]})
data
data.columns
data.values
#数据转换后（数组array）后再转换为df2（常用操作）
df2 = pd.DataFrame(data.values, columns=['one', 'two', 'three'])
df2
#添加key
data['category'] = pd.Categorical(['a', 'b', 'a', 'a', 'b'],
                                  categories=['a', 'b'])

#dummy variable
dummies = pd.get_dummies(data.category, prefix='category')
data_with_dummies = data.drop('category', axis=1).join(dummies)
data_with_dummies
~~~

:spider_web:上述代码对于分类问题可以学一手

## 13.2 用Patsy创建模型描述（Creating Model Descriptions with Patsy）

Patsy是Python的⼀个库，使⽤简短的字符串“公式语法”描述统计模型（尤其是线性模型），可能是受到了R和S统计编程语⾔的公式语法的启发。

## 13.3 statsmodels介绍（Introduction to statsmodels）

statsmodels是Python进⾏拟合多种统计模型、进⾏统计试验和数据探索可视化的库。Statsmodels包含许多经典的统计⽅法，但没有⻉叶斯⽅法和机器学习模型。

statsmodels包含的模型有：

* 线性模型，⼴义线性模型和健壮线性模型
* 线性混合效应模型
* ⽅差（ANOVA）⽅法分析
* 时间序列过程和状态空间模型
* ⼴义矩估计

statsmodels的线性模型有两种不同的接⼝：**基于数组和基于公式**。

#### Estimating Linear Models

这些都不用看了

## 13.4 scikit-learn介绍（Introduction to scikit-learn）

scikit-learn是⼀个⼴泛使⽤、⽤途多样的Python机器学习库。它包含多种标准监督和⾮监督机器学习⽅法和模型选择和评估、数据转换、数据加载和模型持久化⼯具。这些模型可以⽤于分类、聚合、预测和其它任务。

⽤⼀个Kaggle竞赛的经典数据集，关于泰坦尼克号乘客的⽣还率。

~~~python
train = pd.read_csv('datasets/titanic/train.csv')
test = pd.read_csv('datasets/titanic/test.csv')
#计算train和test中的空值信息
train.isnull().sum()
test.isnull().sum()
#平均值填充，但是我几乎不用
impute_value = train['Age'].median()
train['Age'] = train['Age'].fillna(impute_value)
test['Age'] = test['Age'].fillna(impute_value)
#IsFemale充当key，来进行分组（增加了⼀个列IsFemale，作为“Sex”列的编码）
train['IsFemale'] = (train['Sex'] == 'female').astype(int)
test['IsFemale'] = (test['Sex'] == 'female').astype(int)
test[:5]
#test train
predictors = ['Pclass', 'IsFemale', 'Age']
X_train = train[predictors].values
X_test = test[predictors].values
y_train = train['Survived'].values
#前面就是数据预处理的内容
#下面进行逻辑回归
from sklearn.linear_model import LogisticRegression
#定义模型
model = LogisticRegression()
#模型fit
model.fit(X_train, y_train)
#预测predict
y_predict = model.predict(X_test)
y_predict[:10]
#交叉验证通过分割训练数据来模拟样本外预测。基于模型的精度得分（⽐如均⽅差），可以对模型参数进⾏⽹格搜索。有些模型，如logistic回归，有内置的交叉验证的估计类。
from sklearn.linear_model import LogisticRegressionCV
model_cv = LogisticRegressionCV(10)
model_cv.fit(X_train, y_train)
#⼿动进⾏交叉验证，你可以使⽤cross_val_score帮助函数，它可以处理数据分割。例如，要交叉验证我们的带有四个不重叠训练数据的模型
from sklearn.model_selection import cross_val_score
model = LogisticRegression(C=10)
scores = cross_val_score(model, X_train, y_train, cv=4)
scores
~~~

:spider_web:train.isnull().sum()统计data中的空值，在数据分析中经常用到。

:spider_web:在实际中，模型训练经常有许多额外的复杂因素。许多模型有可以调节的参数，有些⽅法（⽐如交叉验证）可以⽤来进⾏参数调节，避免对训练数据过拟合。这通常可以提高预测性或对新数据的健壮性。

:spider_web:交叉验证通过分割训练数据来模拟样本外预测。基于模型的精度得分（⽐如均⽅差），可以对模型参数进⾏网格搜索。有些模型，如logistic回归，有内置的交叉验证的估计类。例如，logisticregressioncv类可以⽤⼀个参数指定网格搜索对模型的正则化参数C的粒度。

## 13.5 继续学习（Continuing Your Education）

**《Introduction to Machine Learning with Python》**

《Data Science from Scratch: First Principles》

《Python Machine Learning》

**《Hands-On Machine Learning with Scikit-Learn and TensorFlow》**

加油干

