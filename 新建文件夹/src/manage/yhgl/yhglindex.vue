<template>
    <div>
    <div class="table">
        <el-table :data="tableData" border style="width: 100%" @cell-click="cellClick">
            <el-table-column prop="data" label="分类"></el-table-column>
            <el-table-column prop="data2" label="账户数量" width="130"></el-table-column>
            <el-table-column prop="data3" label="开通数量" width="130"></el-table-column>
            <el-table-column prop="data4" label="禁用数量" width="130"></el-table-column>
            <el-table-column label="活跃比" align="center">
                <el-table-column prop="data5" label="本周" width="130"></el-table-column>
                <el-table-column prop="data6" label="本月" width="130"></el-table-column>
                <el-table-column prop="data7" label="本季" width="130"></el-table-column>
                <el-table-column prop="data8" label="本年" width="130"></el-table-column>
            </el-table-column>
        </el-table>
    </div>
    <div :id="echarpid">
        <v-echar :id='echarid' :pid='echarpid' :options="option"></v-echar>
    </div>
    </div>
</template>
<script>
import echar from '@/components/echar/echar.vue';
export default {
    components:{
        "v-echar" : echar
    },
    data() {
        return {
            tableData: [
                {
                    data:'市民',
                    data2:2,
                    data3:24353,
                    data4:2454,
                    data5:455,
                    data6:625,
                    data7:252437,
                    data8:8245435
                },
                {
                    data:'企业',
                    data2:2,
                    data3:2453,
                    data4:254,
                    data5:2455,
                    data6:2456,
                    data7:2457,
                    data8:248
                },
                {
                    data:'社区',
                    data2:2,
                    data3:24233,
                    data4:4255,
                    data5:5255,
                    data6:6245,
                    data7:2457,
                    data8:52458
                },
                {
                    data:'物业',
                    data2:245,
                    data3:4253,
                    data4:2454,
                    data5:343245,
                    data6:2456,
                    data7:73242,
                    data8:8232
                },
                {
                    data:'电商',
                    data2:23435,
                    data3:3435245,
                    data4:4425245,
                    data5:5245,
                    data6:6245,
                    data7:745435,
                    data8:8425435
                }
            ],
            echarid:"echar",
            echarpid:"e-char",
            option : {
                title: {
                    text: '账户活跃度',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data:['最高活跃度','最低活跃度']
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: {readOnly: false},
                        magicType: {type: ['line', 'bar']},
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis:  {
                    type: 'category',
                    boundaryGap: false,
                    data: ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
                },
                yAxis: {
                    type: 'value',
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series: [
                    {
                        name:'企业用户',
                        type:'line',
                        data:[11, 11, 15, 13, 12, 13, 11, 15, 13, 12, 13],
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
                        name:'社区用户',
                        type:'line',
                        data:[1, 4, 164, 5, 64, 2, 7,13, 64, 13, 11, 15,],
                        markPoint: {
                            data: [
                                {name: '月最低', value: 1, xAxis: 1, yAxis: 1}
                            ]
                        },
                        markLine: {
                            data: [
                                {type: 'average', name: '平均值'},
                                [{
                                    symbol: 'none',
                                    x: '90%',
                                    yAxis: 'max'
                                }, {
                                    symbol: 'circle',
                                    label: {
                                        normal: {
                                            position: 'start',
                                            formatter: '最大值'
                                        }
                                    },
                                    type: 'max',
                                    name: '最高点'
                                }]
                            ]
                        }
                    }
                ]
            }
        }
    },
    created() {
    },
    methods: {
        cellClick(row, column, cell, event){
            console.log(row.data)
            console.log(column.label)
            this.$router.push({path:'/yhgllb',query:{data:row.data,label:column.label}})
        }, 
        
        getData() {
            let params = {
                dataStatus: this.select_cate,
                dataKeys: this.select_word,
                cur_page: this.cur_page,
                page_size: this.page_size,
            };
            getYhglGrid(params).then(data => {
                this.tableData = data.result;
            });
        }
    }
}
</script>

<style scoped>
.handle-box {
    margin-bottom: 20px;
}
#e-char{width: 100%;margin-top: 20px;height: 200px;}
</style>