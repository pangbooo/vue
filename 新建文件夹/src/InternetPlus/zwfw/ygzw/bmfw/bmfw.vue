/** 
 * 文档描述: 
 * 作者: 杨闯 
 * 创建时间: 2017-09-21 18:44:14 
 * 最后修改人: 杨闯 
 * 最后修改时间: 2017-09-21 18:44:14 
 */
<template>
<!-- 便民服务 -->
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="location">
        <idt-breadcrumb :page="page"></idt-breadcrumb>
    </div>
    <div class="center">
        <div class="bmfw-column">
            <div class="bmfw-column-title">教育与招考</div>
            <ul>
                <li>
                    <a href="#">
                        <img src="./img/icon1.png">
                        <p>普通高考成绩查询</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon2.png">
                        <p>公务员招考</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon3.png">
                        <p>事业单位招考</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon4.png">
                        <p>成人高考查询</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon5.png">
                        <p>建设厅考试成绩查询</p>
                    </a>
                </li>
            </ul>  
            <div class="bmfw-column-title">纳税缴费</div>
            <ul>
                <li>
                    <a href="#">
                        <img src="./img/icon6.png">
                        <p>公共支付</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon7.png">
                        <p>缴水费</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon8.png">
                        <p>缴电费</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon9.png">
                        <p>缴燃气费</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon10.png">
                        <p>网上纳税</p>
                    </a>
                </li>
                <li>
                    <a class="fpcx" href="#">
                        <img src="./img/icon11.png">
                        <p>发票查询</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon12.png">
                        <p>个人纳税证明</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon13.png">
                        <p>企业纳税证明</p>
                    </a>
                </li>
            </ul>  
            <div class="bmfw-column-title">就医保健</div>
            <ul>
                <li>
                    <a href="#">
                        <img src="./img/icon14.png">
                        <p>定点医疗机构</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon15.png">
                        <p>预防接种服务机构</p>
                    </a>
                </li>
            </ul>  
            <div class="bmfw-column-title">交通旅游</div>
            <ul>
                <li>
                    <a href="#">
                        <img src="./img/icon16.png">
                        <p>普通公路交通违法处理</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon17.png">
                        <p>高速公路违法处理</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon18.png">
                        <p>交通安全法规</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon19.png">
                        <p>交通安全标识</p>
                    </a>
                </li>
            </ul>  
            <div class="bmfw-column-title">环境气象与灾害安全</div>
            <ul>
                <li>
                    <a href="#">
                        <img src="./img/icon20.png">
                        <p>实时水雨情</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon21.png">
                        <p>海洋灾害警报</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon22.png">
                        <p>重污染天气预警</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon23.png">
                        <p>地质灾害气象风险预报（警）</p>
                    </a>
                </li>
            </ul>  
            <div class="bmfw-column-title">小企业服务</div>
            <ul>
                <li>
                    <a href="#">
                        <img src="./img/icon24.png">
                        <p>投融资服务</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon25.png">
                        <p>培训服务</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon26.png">
                        <p>创业服务</p>
                    </a>
                </li>
                <li>
                    <a href="#">
                        <img src="./img/icon27.png">
                        <p>技术创新</p>
                    </a>
                </li>
            </ul>  
        </div> 
    </div>
    <idt-footer></idt-footer>
</div>
</template>
<script>
import idtheader from '@/InternetPlus/common/header/header';
import idtfooter from '@/InternetPlus/common/footer/footer';
import idtnavbar from '@/InternetPlus/common/navbar/navbar';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
export default{
    data() {
        return {
            page:'bmfw',
        }
    },
    components:{
        'idt-header':idtheader,
        'idt-footer':idtfooter,
        'idt-navbar':idtnavbar,
        'idt-breadcrumb':idtbreadcrumb,
    },
    created() {
        
    },
    methods:{
        
    }
}
</script>
<style scoped>
/* 便民服务样式 */
.center{width: 1260px;margin: 0px auto;overflow:hidden;}
.location{margin:0px auto;width: 1260px;height: 50px;}
.bmfw-column{width: 1254px;margin:0px 0px 20px;}
.bmfw-column-title{width: 1254px;height: 42px;border: 1px solid #e7e7e7;font-size: 20px;
line-height: 42px;text-indent: 20px;margin:12px 0px 0px;}
.bmfw-column ul{width: 1254px;overflow: hidden;border: 1px solid #e7e7e7;border-top: none;}
.bmfw-column ul li{float:left;}
.bmfw-column ul li a{width: 208px;height: 208px;border-bottom: 1px solid #e7e7e7;
border-right: 1px solid #e7e7e7;display: block;text-align: center;}
.bmfw-column ul li .fpcx{border-right: none;}
.bmfw-column ul li a:hover{background:#f3f3f3;}
.bmfw-column ul li a img{margin:42px 0px;}
.bmfw-column ul li a p{font-size: 18px;}
</style>