<template>
  <div>
    <span class="configuration">
      <span class="btn-group btn-group-xs">
        <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" >
          对齐
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li class="active">
            <a  rel="">默认</a>
          </li>
          <li class="">
            <a  rel="text-left">靠左</a>
          </li>
          <li class="">
            <a  rel="text-center">居中</a>
          </li>
          <li class="">
            <a  rel="text-right">靠右</a>
          </li>
        </ul>
      </span>
      <span class="btn-group btn-group-xs">
        <a class="btn btn-default dropdown-toggle" data-toggle="dropdown" >
          标记
          <span class="caret"></span>
        </a>
        <ul class="dropdown-menu">
          <li class="active">
            <a  rel="">默认</a>
          </li>
          <li class="">
            <a  rel="text-muted">禁用</a>
          </li>
          <li class="">
            <a  rel="text-warning">警告</a>
          </li>
          <li class="">
            <a  rel="text-danger">错误</a>
          </li>
          <li class="">
            <a  rel="text-info">提示</a>
          </li>
          <li class="">
            <a  rel="text-success">成功</a>
          </li>
        </ul>
      </span>
    </span>
    <div class="preview"></div>
    <div class="view">
      <h3 contenteditable="true">这是一套可视化布局系统</h3>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String
      }
    }
  }
</script>

<style>
  
</style>