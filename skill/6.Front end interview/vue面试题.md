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





## 第二题：说一下

2021/7/9 杭州 晴 22：26