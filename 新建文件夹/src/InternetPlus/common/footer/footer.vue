/**
 * 通用footer
 * author:kxc
 * 2017-08-07
 */
<template>
  <div class="zwfw-footer" id="zwfw-footer">
        <div class="zwfw-footer__content">
            <span class="zwfw-footer__left">主办：大连倚天软件股份有限公司</span>
            <ul>
                <li><a href="#">关于我们</a></li>
                <li><a href="#">服务条款</a></li>
                <li><a href="#">招聘信息</a></li>
                <li><a href="#">法律声明</a></li>
                <li><a href="#">联系我们</a></li>
            </ul>
            <span class="zwfw-footer__right">CopyRight @ 2017 大连倚天软件股份有限公司 All Rights Reserved</span>
        </div>
    </div>
</template>

<script>
  export default {
    mounted() {
        
    },
    methods: {
        
    }
  }
</script>

<style scoped>
/**
 * 通用footer
 * css belong to footer.vue
 * author:kxc
 * 2017-08-07
 */
  .zwfw-footer{width: 100%;height:50px;background: #272727;}
  .zwfw-footer__content{width: 1250px;height: 50px;background: #272727;margin: 0px auto;line-height: 50px;position: relative;color: #797671;font-size: 14px;}
  .zwfw-footer__content ul{position: absolute;top: 18px;left: 300px;}
  .zwfw-footer__content ul li{float: left;padding: 0px 10px;border-right: 1px solid #555;height: 14px;line-height:14px;}
  .zwfw-footer__content ul li:last-child{border-right: none;}
  .zwfw-footer__content ul li a{color: #797671;font-size: 14px;}
  .zwfw-footer__left {padding-left: 30px;}
  .zwfw-footer__content .zwfw-footer__right{float: right;margin-right: 10px;font-size: 14px;}
</style>
