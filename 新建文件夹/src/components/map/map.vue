<template>
  <div>
    <div id="allmap" :style="{'width': this.data.width, 'height': this.data.height}"></div>
  </div>
</template>

<script>
  export default {
    name:'v-map',
    props: {
      data: {
        type: Object,
        default() {
          return {
            width:'400px', // map显示区宽度
            height: '325px', // map县市区高度
            pointX: 125.150179, // 中心点X坐标
            pointY: 42.894068, // 中心点Y坐标
            title: '辽源市', // 提示信息标题（地点名称）
            address: '辽源市' // 提示信息内容（地址、联系方式等）
          }
        }
      }
    },
    mounted() {
      this.initMap();
    },
    methods: {
      initMap() {
        var map = new BMap.Map('allmap'); // 创建Map实例
        var pointX = this.data.pointX*1;
        var pointY = this.data.pointY*1;
        var point = new BMap.Point(pointX,pointY); // 创建点坐标
        map.centerAndZoom(point,18);
        var marker = new BMap.Marker(point);  // 创建标注
        map.addOverlay(marker);              // 将标注添加到地图中
        marker.setAnimation(BMAP_ANIMATION_BOUNCE); //跳动的动画
        map.enableScrollWheelZoom(true); // 启动鼠标滚轮缩放
        var opts = {
          width : 200,     // 信息窗口宽度
          height: 100,     // 信息窗口高度
          title : this.data.title
        }
        var infoWindow = new BMap.InfoWindow(this.data.address, opts);  // 创建信息窗口对象 
        marker.addEventListener("click", function(){          
        map.openInfoWindow(infoWindow,point); //开启信息窗口
        });
      }
    }
  }
</script>

<style scoped>
  #allmap{overflow: hidden;margin:0;font-family:"微软雅黑";}
</style>