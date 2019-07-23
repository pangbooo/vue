<template>
  <div id="app">
    <h1>App!</h1>
    <TodoList/>
  </div>
</template>

<script>
// import '../assets/app.css'
import TodoList from './components/TodoList.vue'
export default {
 name: 'app',
 components: {
		TodoList
	}
}
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
h1 {
	text-align: center;
}
</style>




