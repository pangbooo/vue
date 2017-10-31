<template>
  <div id="index">
    <v-header :user="user" :radio="radio" @msg="showMsg"></v-header>
    <div class="content">
      你可以看到我么？我是data里的变量msg哦：{{ msg }}
      <br><br>
      下面有请过滤器来操作字符串msg2：{{ msg2 | addString }}
      <br><br>
      created生命周期钩子:{{ created }}
      <br><br>
      mounted生命周期钩子:{{ mounted }}
      <br><br>
      <el-input v-model="user" placeholder="我会改变传入header里的值哦~" style="width:300px;"></el-input>
      <br><br>
      <el-radio v-model="radio.checked" label="1">备选项</el-radio>
      <el-radio v-model="radio.checked" label="2">备选项</el-radio>
    </div>
  </div>
</template>
<script>
import header from '@/components/header/header'
export default {
  name: 'Home', // 组件标识符
  components: {
    'v-header': header // 组件已‘v-’统一管理
  },
  data () {
    return {  // 作为视图要data要是个方法 返回对象
      msg: 'Welcome to Your Vue.js 这里是index.vue视图',
      msg2: '我是一个很长的字符串',
      created: '',
      mounted: '',
      user: '',
      radio: {
        checked: ''
      },
      num: 1
    }
  },
  created () {
    this.created = '在实例创建完成后被立即调用。在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。然而，挂载阶段还没开始，$el 属性目前不可见。'
  },
  mounted () {
    this.mounted = 'el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。如果 root 实例挂载了一个文档内元素，当 mounted 被调用时 vm.$el 也在文档内。注意 mounted 不会承诺所有的子组件也都一起被挂载。如果你希望等到整个视图都渲染完毕，可以用 vm.$nextTick 替换掉 mounted：'
  },
  filters: {
    addString (val) {
      return val + '------我更长了'
    }
  },
  computed: {

  },
  methods: {
    showMsg: function (val) {
      alert('我接受到了：' + val)
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .content{
    background-color: #ccc;
    text-align: center;
    font-size: 14px;
    padding: 40px;
  }
</style>
<style>
  /*去掉scoped 修改子组件里的样式 此类的样式为全局样式*/
  #index .logo{color: red;}
</style>
