<template>
  <div class="weather">
    <div class="weather-content"></div>
    <div class="time">
      <span class="year"></span>
      <span class="month"></span>
      <span class="day"></span>
    </div>
    <div class="week">
    </div>
    <div class="city-tianqi">
      <span class="city"></span>
      <span class="cloud"></span>
    </div>
    <div id="weather"></div>
  </div>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    mounted() {
      require('@/lib/jquery.weather.min.js');
      this.initWeather();
    },
    methods: {
      initWeather() {
        $('.weather-content').leoweather({format:'<i class="icon-{图标}">{气温}℃</i>'});
        $('.year').leoweather({format:'{年}- '});
        $('.month').leoweather({format:'{月}- '});
        $('.day').leoweather({format:'{日} '});
        $('.week').leoweather({format:'星期{周}'});
        $('.city').leoweather({format:'{城市} {天气}'});
        $('.cloud').leoweather({format:'{风向}{风级}级'});
        // $('#weather').leoweather({format:'，{时段}好！，<span id="colock">现在时间是：<strong>{年}年{月}月{日}日 星期{周} {时}:{分}:{秒}</strong>，</span> <b>{城市}天气</b> {天气} {夜间气温}℃ ~ {白天气温}℃'});
      }
    },
    components: {

    }
  }
</script>

<style scoped>
  .weather {width: 456px;height: 80px;margin: 70px 0px 0px;position: relative;}
  .weather-content {position: absolute;left: 120px;top: 10px;}
  .week{font-size: 15px;position: absolute;right: 10px;top: 10px;}
  .time{font-size: 15px;position: absolute;right: 65px;top: 10px;}
  .city-tianqi{font-size: 15px;position: absolute;right: 10px;top: 28px;}
</style>
<style>
  .weather p {position: absolute;right: 10px;top: 10px;}
  .weather i { background: no-repeat top left; display:inline-block; height:38px; line-height:38px; padding-left:50px; font-style:normal; text-align:center; font-weight:bold; background-size: contain;font-size: 35px;color: #fd5c00; }
  .weather i.icon-xiaoyu { background-image:url(./icon/xiaoyu.png);}
  .weather i.icon-zhongyu { background-image:url(./icon/zhongyu.png);}
  .weather i.icon-zhenyu { background-image:url(./icon/zhenyu.png);}
  .weather i.icon-dayu { background-image:url(./icon/dayu.png);}
  .weather i.icon-qing { background-image:url(./icon/qing.png);}
  .weather i.icon-duoyun { background-image:url(./icon/duoyun.png);}
  .weather i.icon-yin { background-image:url(./icon/yin.png);}
  .weather i.icon-baoyu { background-image:url(./icon/baoyu.png);}
  .weather i.icon-daxue { background-image:url(./icon/daxue.png);}
  .weather i.icon-gaowen { background-image:url(./icon/gaowen.png);}
  .weather i.icon-leidian { background-image:url(./icon/leidian.png);}
  .weather i.icon-leizhenyu { background-image:url(./icon/leizhenyu.png);}
  .weather i.icon-qingzhuanyu { background-image:url(./icon/qingzhuanyu.png);}
  .weather i.icon-xiaoxue { background-image:url(./icon/xiaoxue.png);}
  .weather i.icon-yejiandaxue { background-image:url(./icon/yejiandaxue.png);}
  .weather i.icon-yujiaxue { background-image:url(./icon/yujiaxue.png);}
</style>