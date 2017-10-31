/** 通用echar
* 这是一个通用图表组件。
* 使用e-char保证编辑器的多功能性和高效性。
* 当前使用版本e-char v3.6.2， API文档：http://echarts.baidu.com/api.html
* 作者：李文达leo
* 创建时间：2017-08-11
* 最后编辑时间：2017-08-11
**/
<template>
		<div :id="id" :ref="id" :style="{width:ewidth,height:eheight}"></div>
</template>

<script>
let echarts = require('echarts')

  export default {
    name: 'EChar',
    data() {
      return {
        eheight:'500px',
        mainChart:null
      }
    },
    props: {
      options: {
        type: Object,
        default:{}
      },
      id: {
        type: String
      },
      pid: {
        type: String
      },
      ewidth: {
        type: String,
        default: '1000px'        
      }
    },
    mounted() {
      this.resizeCharts()
      this.mainChart = echarts.init(document.getElementById(this.id))
      this.mainChart.setOption(this.options)
    },
    methods: {
      resizeCharts () {
        let chartBox = document.getElementById(this.pid)
        let myChart = document.getElementById(this.id)
        myChart.style.width = chartBox.style.width + 'px'
        myChart.style.height = chartBox.style.height + 'px'
      },
    },
    destroyed() {
      this.mainChart.dispose();
    }
  };
</script>

<style>
</style>