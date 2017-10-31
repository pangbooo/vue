/*
 * @文档描述: 评价统计
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-09-25 09:11:58 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-09-27 21:03:11
 */

<template>
<div>
    <idt-header></idt-header>
    <idt-navbar></idt-navbar>
    <div class="pjtj" id="pjtj">
        <div class="pjtj__content">
            <idt-breadcrumb :page="page" :params="params"></idt-breadcrumb>
            <div class="pjtj__content__line"></div>
            <div class="pjtj__content__left" id="pjtj__content__left">
                <idt-echar :id='leftecharid' :pid='leftecharpid' :ewidth="ewidth" :options="leftoption"></idt-echar>
            </div>
            <div class="pjtj__content__right" id="pjtj__content__right">
                <idt-echar :id='rightecharid' :pid='rightecharpid' :ewidth="ewidth" :options="rightoption"></idt-echar>                
            </div>
            <div style="clear: both;"></div>
        </div>
    </div>
    <idt-footer></idt-footer>
    <idt-floatbar></idt-floatbar>
</div>    
</template>

<script>
import idtheader from '@/InternetPlus/common/header/header.vue';
import idtnavbar from '@/InternetPlus/common/navbar/navbar.vue';
import idtbreadcrumb from '@/components/breadcrumb/breadcrumb.vue';
import idtfooter from '@/InternetPlus/common/footer/footer.vue';
import idtechar from '@/components/echar/echar.vue';
import idtfloatbar from '@/InternetPlus/common/floatbar/floatbar.vue';

export default {
    data() {
        return {
            page: 'pjtj',
            params: [],
            leftecharid: 'leftPieChart',
            leftecharpid: 'pjtj__content__left',
            ewidth: '620px',
            leftoption: {
                title : {
                    text: '南丁格尔玫瑰图',
                    // subtext: '纯属虚构',
                    x:'center'
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{b} : {c} ({d}%)"
                },
                legend: {
                    x : 'center',
                    y : 'bottom',
                    data:['非常满意','满意','一般','不满意','失望']
                },
                toolbox: {
                    show : true,
                    feature : {
                        dataView : {show: true, readOnly: true},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                calculable : true,
                series : [
                    {
                        name:'面积模式',
                        type:'pie',
                        radius : [30, 110],
                        // center : ['5%', '50%'],
                        roseType : 'area',
                        data:[
                            {value:10, name:'非常满意'},
                            {value:5, name:'满意'},
                            {value:15, name:'一般'},
                            {value:25, name:'不满意'},
                            {value:25, name:'失望'}
                        ]
                    }
                ]
            },
            rightecharid: 'rightPieChart',
            rightecharpid: 'pjtj__content__right',
            rightoption: {
                title: {
                    text: '折线图和柱形图',
                    // subtext: '纯属虚构'
                    x: 'center',
                    y: 'bottom'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['非常满意','满意','一般','不满意','失望']                    
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataView: { readOnly: true },
                        magicType: {type: ['line', 'bar']},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: ['发改委','住建局','规划局','教育局','人社局','劳动局','国土局']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value}'
                    }
                },
                series: [
                    {
                        name:'非常满意',
                        type:'line',
                        data:[100, 110, 120, 130, 120, 135, 100],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'满意',
                        type:'line',
                        data:[80, 89, 50, 55, 98, 45, 100],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'一般',
                        type:'line',
                        data:[40, 60, 76, 67, 56, 65, 69],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'不满意',
                        type:'line',
                        data:[77, 45, 65, 56, 54, 47, 89],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                    {
                        name:'失望',
                        type:'line',
                        data:[32, 35, 27, 30, 40, 39, 21],
                        markPoint: {
                            data: [
                                {type: 'max', name: '最大值'},
                                {type: 'min', name: '最小值'}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'}
                            ]
                        }
                    },
                ]
            }
        }
    },
    components: {
        'idt-header': idtheader,
        'idt-navbar': idtnavbar,
        'idt-breadcrumb': idtbreadcrumb,
        'idt-footer': idtfooter,
        'idt-echar': idtechar,
        'idt-floatbar': idtfloatbar
    },
    created() {
        this.getpjtjdata();
    },
    methods: {
        getpjtjdata(){
            
        }
    }
}

</script>

<style scoped>
/* 
    css belong to pjlb.vue
*/
.pjtj{
    width: 1260px;
    margin: 0 auto;
}
.pjtj__content{
    width: 1250px;
    margin: 0 auto;
    /* border-top: 1px solid #cccccc; */
}
.pjtj__content__line{
    width: 100%;
    border-top: 1px solid #cccccc;
}
.pjtj__content__left,.pjtj__content__right{
    margin: 50px 0;
}
#pjtj__content__left{
    width: 625px;
    float: left;
    border-right: 1px solid #797979;
}
#pjtj__content__right{
    width: 624px;
    float: right;
}
</style>
