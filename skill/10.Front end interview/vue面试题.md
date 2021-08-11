# vue面试题



## 第一题：说一下有哪些方式可以实现父组件使用子组件的方法?

2021/7/9 杭州 晴 22：26

第一种：使用$emit和$on

~~~JavaScript
//父组件中
<template>
    <div>
        <Button @click="handleClick">点击调用子组件方法</Button>
        <Child ref="child"/>
    </div>
</template>    
<script>
import Child from './child';

export default {
    methods: {
        handleClick() {
              this.$refs.child.$emit('sing');
        },
    },
}
</script>


//子组件中
<template>
  <div>我是子组件</div>
</template>
<script>
export default {
  mounted: {
      this.$on('sing',this.sing)
  },
  methods: {
    sing() {
      console.log('我是子组件的方法');
    },
  },
};
</script>
~~~

第二种：使用$refs

~~~JavaScript
//父组件中
<template>
    <div>
        <Button @click="handleClick">点击调用子组件方法</Button>
        <Child ref="child"/>
    </div>
</template>    
<script>
import Child from './child';

export default {
    methods: {
        handleClick() {
              this.$refs.child.sing();
        },
    },
}
</script>


//子组件中
<template>
  <div>我是子组件</div>
</template>
<script>
export default {
  methods: {
    sing() {
      console.log('我是子组件的方法');
    },
  },
};
</script>
~~~

第三种：EventBus



第四种：插件Pubsub





## 第二题：说一下vuejs中created与mounted区别？

2021/7/11 杭州 晴 18：40

Vue实例有一个完整的生命周期，也就是从**开始创建**、**初始化数据**、**编译模板**、**挂载Dom**、**渲染→更新→渲染**、**卸载**等一系列过程，我们称这是Vue的生命周期。通俗说就是Vue实例从创建到销毁的过程，就是生命周期。

https://blog.csdn.net/weixin_34167043/article/details/88023586

created组件实例创建完成，属性已绑定，Dom还未生成，$el还不存在

mounted模板编译挂载之后





## 第三题：说一下vue 中的动态传参和query传参？

2021/7/12 杭州 晴 11：20

- params：`/router1/:id` 、`{path:'/shop', query:{id:item.id}}`，这里的 id 叫做 params。例如 /router1/123, /router1/789
- query：`/router1?id=123`，这里的 id 叫做 query。例如 /router1?id=456

首先是query传参 `this.$router.push({ path:'/xxx' query:{ id:id } })` 并不会引起页面刷新，需要重新请求数据。接收参数: `this.$route.query.id`。

params 传参 路由界面： router.js: 路由设置这里，当你使用 params 方法传参的时候，要在路由后面加参数名，并且传参的时候，参数名要跟路由后面设置的参数名对应。传参: `this.$router.push({ name:'xxx' params:{ id:id } })` 接收参数: `this.$route.params.id`





## 第四题：总结面试题（网易实习笔试）

2021/7/13 杭州 晴 14：17

算法题解：有效三角形的个数

一组数据，判断能组成三角形最多的数，如果有多个，都写下来。

>给定一个包含非负整数的数组，你的任务是统计其中可以组成三角形三条边的三元组个数。
>
>示例 1:
>
>输入: [2,2,3,4]
>输出: 3
>解释:
>有效的组合是:
>2,3,4 (使用第一个 2)
>2,3,4 (使用第二个 2)
>2,2,3
>注意:
>
>数组长度不超过1000。
>数组里整数的范围为 [0, 1000]。



```javascript
let n = parseInt(readline());
let arr = readline().split(' ').map((a) => parseInt(a)).sort((a, b) => a - b);
let canComTri = new Array(n).fill(0);
for (let i = 0; i < n - 2; i++) {
    for (let j = i + 1; j < n - 1; j++) {
        for (let k = j + 1; k < n; k++) {
            if (arr[k] < arr[i] + arr[j]) {
                canComTri[i]++;
                canComTri[j]++;
                canComTri[k]++;
            } else {
                break;
            }
        } 
    }
}
let res = [];
let max = Math.max(...canComTri);
for (let i = 0; i < n; i++) {
    if (canComTri[i] === max) res.push(arr[i]);
}
console.log(res.join(' '))
```

优化方案更新，两次三重循环，三重循环优化后时间复杂度由O(N^3)降为O(N^2)，第3重循环的数k与第2重j相关，因此降低了时间复杂度

```javascript
let n = parseInt(readline());
let arr = readline()
  .split(" ")
  .map((a) => parseInt(a))
  .sort((a, b) => a - b);
let canComTri = new Array(n).fill(0);
for (let i = 0; i < n - 2; i++) {
  let k = i + 2;
  for (let j = i + 1; j < n - 1; j++) {
    for (k = k > j ? k : j + 1; k < n && arr[k] < arr[i] + arr[j]; k++) {}
    canComTri[i] += k - j - 1;
    canComTri[j] += k - j - 1;
  }
}

for (let i = n - 1; i >= 2; i--) {
  let k = i - 2;
  for (let j = i - 1; j >= 1; j--) {
    for (k = k < j ? k : j - 1; k >= 0 && arr[i] < arr[j] + arr[k]; k--) {}
    canComTri[i] += k - j - 1;
  }
}
let res = [];
let max = Math.max(...canComTri);
for (let i = 0; i < n; i++) {
  if (canComTri[i] === max) res.push(arr[i]);
}
console.log(res.join(" "));
```