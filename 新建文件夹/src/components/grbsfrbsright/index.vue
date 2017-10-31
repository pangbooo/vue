<template>
<div class="bmfw-right">
    <div class="frbs-list" id="frbs-list">
        <div class="frbs-list-detail" v-for="lidata in listData" :class="{ frbsListDetailH: lidata.visSelected }">
            <div class="frbs-list-title" @click="hideList(lidata.id)">
                <h4 class="nbr">{{ lidata.vtitle }}</h4><span></span>
            </div>
            <ul class="bmfw-list-con" v-show="lidata.visSelected">
                <li v-for="lid in lidata.vcontent"><a :href="lid.link">{{ lid.text }}</a></li>
            </ul>
        </div>
    </div>
    <ul id="layui-page fr"></ul>
</div>
</template>

<script>
export default{
    data(){
        return{
            listData:[
                {
                    id: 0,
                    vtitle: '生育',
                    visSelected: true,
                    vcontent: [
                        { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                        { text: '结婚登记',link: 'javascript:void(0)' },
                        { text: '补领结婚证',link: 'javascript:void(0)' },
                        { text: '离婚登记',link: 'javascript:void(0)' },
                        { text: '补领离婚证',link: 'javascript:void(0)' },
                        { text: '撤销婚姻',link: 'javascript:void(0)' },
                        { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                    ]
                },
                {
                    id: 1,
                    vtitle: '婚姻',
                    visSelected: true,
                    vcontent: [
                        { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                        { text: '结婚登记',link: 'javascript:void(0)' },
                        { text: '补领结婚证',link: 'javascript:void(0)' },
                        { text: '离婚登记',link: 'javascript:void(0)' },
                        { text: '补领离婚证',link: 'javascript:void(0)' },
                        { text: '撤销婚姻',link: 'javascript:void(0)' },
                        { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                    ]
                },
                {
                    id: 2,
                    vtitle: '收养',
                    visSelected: true,
                    vcontent: [
                        { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                        { text: '结婚登记',link: 'javascript:void(0)' },
                        { text: '补领结婚证',link: 'javascript:void(0)' },
                        { text: '离婚登记',link: 'javascript:void(0)' },
                        { text: '补领离婚证',link: 'javascript:void(0)' },
                        { text: '撤销婚姻',link: 'javascript:void(0)' },
                        { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                    ]
                }
            ],
            vlistData:[
                [
                    {
                        id: 0,
                        vtitle: '生育',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚姻',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收养',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '生育2',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚姻2',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收养2',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '生育1asfa',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚姻212asf',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收养21asda21',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '生asd育121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚姻2jhg12',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收养43fdsf2121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '生sdgsg育121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚dfgdfg姻212',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收dfgdg养2121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '生dgdfg育121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚dfgdfg姻212',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收dfgdfg养2121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '生dfgdfg育121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚dgytre姻212',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收dfhdnn养2121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '生sdgadhe4育121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚adhaehdfnrt姻212',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收eoiyty养2121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '生rbsrbwqgfnsfgn育121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚nbsrgbrt姻212',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收rnrtnbr养2121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: 'dfbarb生育dfbsrntsra121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: 'afgbr婚aebearb姻212',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: 'rbrsb收bet养nrn2121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '生brtsb育1srtn21',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚zdfgtr姻2rnt12',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收afbtr养2nrtn121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: 'retn生育fdav121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚adfb姻adfb212',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收dfbr养bafb2121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: 'adfba生育1adfba21',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚adfbab姻21adfnertrtb2',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收wewefs养212dfsdf1',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: 'sdfsf生育1sdgsfgbfs21',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '1212335345婚姻212',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收养eqweqwe3242121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '12e1生qweqwe育121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: 'SDF 婚12123sfwef姻212',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: 'Sf 收SGWG 养2121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '生育1!!!!!!!@@@@@21',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚SDBADFB姻DFB212',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收EBERBV养21FVER21',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '生##$$$育VEVERV121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚@@@####$$$12',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收养<21wg>rgb-----</21wg>21',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ],
                [
                    {
                        id: 0,
                        vtitle: '生育1========21',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 1,
                        vtitle: '婚姻-00-0yioop;212',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    },
                    {
                        id: 2,
                        vtitle: '收-=;opuy.养2121',
                        visSelected: true,
                        vcontent: [
                            { text: '婚姻登记机关名录',link: 'javascript:void(0)' },
                            { text: '结婚登记',link: 'javascript:void(0)' },
                            { text: '补领结婚证',link: 'javascript:void(0)' },
                            { text: '离婚登记',link: 'javascript:void(0)' },
                            { text: '补领离婚证',link: 'javascript:void(0)' },
                            { text: '撤销婚姻',link: 'javascript:void(0)' },
                            { text: '出具（无）婚姻登记记录证明',link: 'javascript:void(0)' }
                        ]
                    }
                ]
            ]
        }
    },
    created: function(){
        let self=this;
        grfreventBus.$on("getLeftId",function(id){
            // alert(id);
            self.listData=self.vlistData[id-1];
        })
    },
    methods: {
        hideList(val){
            this.listData[val].visSelected=!this.listData[val].visSelected;
        }
    }
}
</script>

<style scoped>
.bmfw{
    .width: 100%;
    position: relative;
    padding-top: 30px;
}
.bg1{
    width: 158px;
    height: 255px;
    position: absolute;
    left: 0;
    top: 20%;
}
.bg2{
    width: 95px;
    height: 151px;
    position: absolute;
    right: 0;
    top: 30%;
}
.bg3{
    width: 275px;
    height: 295px;
    position: absolute;
    right: 0;
    bottom: 0;
}
.center{
    width: 1000px;
    margin: 0 auto;
    position: relative;
    z-index: 4;
    padding-bottom: 30px;
}

.bmfw-left {
    float: left;
    overflow: hidden;
    width: 240px;
    border: 1px solid #dfdfdf;
    border-top: 2px solid #4490d3;
}

.bmfw-nav-title {
    height: 60px;
    line-height: 60px;
    font-weight: bold;
    text-align: center;
    color: #4490d3;
    background-color: #fff;
    font-size: 16px;
}
.bmfw-nav-title span{
    display: block;
    width: 120px;
    height: 100%;
    float: left;
    cursor: pointer;
    box-sizing: border-box;
}
.bmfw-nav-title .hover{background-color: #4490d3;color: #fff;}
.bmfw-nav-title span:first-child{border-right: 1px solid #ebebeb;}
.bmfw-nav-title b {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 16px;
    position: relative;
    top: 4px;
}

.bmfw-nav-con li {
    display: block;
    float: left;
}

.bmfw-nav-con span {
    display: block;
    width: 40px;
    height: 30px;
    margin: 0 auto 2px;
}

.bmfw-nav-con a:hover,
.bmfw-nav-con-h a {
    color: #4490d3;
}

.bmfw-nav-con a:hover span,
.bmfw-nav-con-h span {
}

.bmfw-nav-con li a .k2 {
    background-position: -40px 0;
}

.bmfw-nav-con li a .k3 {
    background-position: 0px -30px;
}

.bmfw-nav-con li a .k4 {
    background-position: -40px -30px;
}

.bmfw-nav-con li a .k5 {
    background-position: 0px -60px;
}

.bmfw-nav-con li a .k6 {
    background-position: -40px -60px;
}

.bmfw-nav-con li a .k7 {
    background-position: 0px -90px;
}

.bmfw-nav-con li a .k8 {
    background-position: -40px -90px;
}

.bmfw-nav-con li a .k9 {
    background-position: 0 -120px;
}

.bmfw-nav-con li a .k10 {
    background-position: -40px -120px;
}

.bmfw-nav-con li a .k11 {
    background-position: 0 -150px;
}

.bmfw-nav-con li a .k12 {
    background-position: -40px -150px;
}

.bmfw-nav-con li a .k13 {
    background-position: 0 -180px;
}

.bmfw-nav-con li a .k14 {
    background-position: -40px -180px;
}

.bmfw-nav-con li a .k15 {
    background-position: 0 -210px;
}

.bmfw-nav-con li a .k16 {
    background-position: -40px -210px;
}

.bmfw-nav-con li a .k17 {
    background-position: 0 -240px;
}

.bmfw-nav-con li a .k18 {
    background-position: -40px -240px;
}

.bmfw-nav-con {
    width: 242px;
    margin-right: -2px;
}

.bmfw-nav-con a {
    width: 120px;
    height: 60px;
    text-align: center;
    line-height: 14px;
    display: block;
    border-bottom: 1px solid #ebebeb;
    border-right: 1px solid #ebebeb;
    font-size: 12px;
    padding-top: 5px;
}
.bmfw-nav-con li:first-child a,.bmfw-nav-con li:nth-child(2) a{
   border-top: 1px solid #ebebeb;
}
.bmfw-right {
    padding-left: 240px;
}

.bmfw-right .frbs-list-detail {
    margin-top: 0;
    margin-bottom: 15px;
    border: none;
    border-bottom: 1px solid #ebebeb;
}

.frbsListDetailH {
    display: block;
}

.bmfw-list-con {
    margin-top: 8px;
    overflow: hidden;
    padding-top: 10px;
    border-top: 1px dotted #ebebeb;
}

.bmfw-list-con li {
    display: block;
    float: left;
    padding: 4px 10px;
    margin-right: 10px;
    margin-bottom: 10px;
    border-radius: 3px;
    border: 1px solid #5babf0;
    color: #5babf0;
}

.bmfw-list-con li:hover {
    background: #5babf0;
    color: #fff;
}

.frbs-right-title {
    margin-left: 20px;
    border-bottom: 2px solid #e2e4ea;
    position: relative;
}

.frbs-right-title h2 {
    border-left: 4px solid #4d8ed9;
    padding: 0 10px;
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    color: #4d8ed9;
}

.frbs-right-title p {
    position: absolute;
    right: 10px;
    top: 1px;
    font-size: 12px;
}

.frbs-list {
    margin-left: 20px;
}

.frbs-list-detail {
    border: 1px solid #ebebeb;
    margin-top: 15px;
    padding: 10px 0 10px 10px;
}

.frbsListDetailH {
    padding: 10px 0 0 10px;
}

.frbs-list-title {
    padding: 0 20px;
    font-size: 18px;
    position: relative;
    background: url(./img/qrcode.png) 2px center no-repeat;
    color: #5babf0;
    cursor: pointer;    
}

.frbs-list-title span {
    display: block;
    width: 20px;
    height: 20px;
    position: absolute;
    right: 10px;
    top: 0;
    background: url(./img/packup.png) center no-repeat;
}

.frbsListDetailH .frbs-list-title span {
    background: url(./img/unfold.png) center no-repeat;
}

.frbsListDetailH .frbs-list-con {
    display: block;
}

.frbs-list-con {
    display: none;
    padding-top: 8px;
}

.frbs-list-con li {
    display: block;
    border-top: 1px solid #ebebeb;
    padding: 4px 0 4px 30px;
}

.frbs-list-con p {
    line-height: 24px;
}

.frbs-list-btngroup {
    font-size: 0;
    padding: 4px 0;
    height: 22px;
}

.frbs-list-btngroup a {
    display: inline-block;
    font-size: 14px;
    padding: 0px 8px;
    border: 1px solid #4d8ed9;
    border-radius: 3px;
    color: #4d8ed9;
    margin-right: 5px;
}
</style>