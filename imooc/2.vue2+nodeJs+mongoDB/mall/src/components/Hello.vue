<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    
    <Counter :num="num" v-on:incre="increment" v-on:decre="decrement"></Counter>
    <p>parents : {{num}}</p>

  </div>
</template>

<script>
import Counter from './Counter';
export default {
  name: 'hello',
  data () {
    return {
      num : '10',
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components : {
    Counter
  },
  methods : {
    increment(){
      this.num++;
    },
    decrement(){
      this.num--;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
