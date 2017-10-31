// 接口描述:网站用获取导航菜单接口
// 接口详细地址:/web/lw
// 参数:父主键id:puuid
const lw = {
    'code': 'idt-oApp-5000', 
    'message': '操作成功', 
    'data': [
        { 
            'path': '/index.html', 
            'show': false, 
            'lmmc': '首页' 
        }, 
        { 
            'text': '提供市民咨询、投诉、举报、建议意见等一站式服务', 
            'subpath': 'http://211.141.29.189:8080/smxs/gateway/index', 
            'subtitle': '市民心声', 'path': '/zwfw/index.html', 
            'children': [
                { 
                    'path': 'javascript:void(0)', 
                    'lmmc': '政务查询', 
                    'uuid': '4a1dd2c08df211e79ec795f7d0079b2b' 
                }, 
                { 
                    'path': 'javascript:void(0)', 
                    'lmmc': '阳光政务', 
                    'uuid': '748466408c9111e7aa6effc3b6d1539e' 
                }, 
                { 
                    'path': 'javascript:void(0)', 
                    'lmmc': '网上办事', 
                    'uuid': '843ac4d18c9111e7aa6effc3b6d1539e' 
                }, 
                { 
                    'path': 'javascript:void(0)', 
                    'lmmc': '办理指南', 
                    'uuid': '98ecc5e28c9111e7aa6effc3b6d1539e' 
                }
            ], 
            'show': false, 
            'lmmc': '政务服务', 
            'uuid': '2', 'subuuid': '3' 
        }, 
        { 
            'text': '汇集丰富的周边查询服务，多终端、随时随地享受便捷惠民服务', 
            'subpath': 'javascript:void(0)', 
            'subtitle': '周边商家', 
            'path': '/shzb/index.html', 
            'children': [
                { 
                    'path': '/shzb/shzbdetail/index.html', 
                    'lmmc': '餐饮美食', 'uuid': '9cd89bc08e1811e79f335df90b590d91' 
                }, 
                { 
                    'path': '/shzb/shzbdetail/index.html', 
                    'lmmc': '生活便利', 'uuid': 'ab1022818e1811e79f335df90b590d91' 
                }, 
                { 
                    'path': '/shzb/shzbdetail/index.html', 
                    'lmmc': '宠物市场', 'uuid': 'f42ae3168e1811e79f335df90b590d91' 
                }, 
                { 
                    'path': '/shzb/shzbdetail/index.html', 
                    'lmmc': '教育培训', 'uuid': 'c381c3a38e1811e79f335df90b590d91' 
                }, 
                { 
                    'path': '/shzb/shzbdetail/index.html', 
                    'lmmc': '家饰装修', 'uuid': 'd36e74748e1811e79f335df90b590d91' 
                }, 
                { 
                    'path': '/shzb/shzbdetail/index.html', 
                    'lmmc': '汽车世界', 'uuid': 'e76032c58e1811e79f335df90b590d91' 
                }, 
                { 
                    'path': '/shzb/shzbdetail/index.html', 
                    'lmmc': '休闲娱乐', 
                    'uuid': '76560eaf8e1811e79f335df90b590d91' 
                }, 
                { 
                    'path': '/shzb/shzbdetail/index.html', 
                    'lmmc': '购物天地', 
                    'uuid': 'b81480728e1811e79f335df90b590d91' 
                }
            ], 
            'show': false, 'lmmc': '生活周边', 
            'uuid': '8331c3d38c9211e7aa6effc3b6d1539e', 
            'subuuid': 'bc096ee68c9511e7aa6effc3b6d1539e' 
        }, 
        { 
            'text': '提供百姓旅游景点的查询、旅行社查询及旅游产品等一站式服务。', 
            'subpath': '/yzly/index.html', 
            'subtitle': '景点查询', 
            'path': '/yzly/index.html', 
            'children': [
                { 
                    'path': '/yzly/rwls/rwlslb/index.html', 
                    'lmmc': '人文历史', 
                    'uuid': '45df90678c9311e7aa6effc3b6d1539e' 
                },
                { 
                    'path': '/yzly/lyjdlb/index.html', 
                    'lmmc': '酒店旅馆', 
                    'uuid': '5246eb088c9311e7aa6effc3b6d1539e' 
                }, 
                { 
                    'path': 'http://flights.ctrip.com', 
                    'lmmc': '机票预订', 
                    'uuid': 'b6a3f8ec8c9311e7aa6effc3b6d1539e' 
                }, 
                { 'path': '/yzly/lyxllb/index.html', 
                'lmmc': '旅游路线', 
                'uuid': '1e87f6ac8e0f11e79f335df90b590d91' 
            }
        ], 
        'show': false, 'lmmc': '游在辽源', 
        'uuid': '95b488d48c9211e7aa6effc3b6d1539e', 
        'subuuid': '235ba8358c9311e7aa6effc3b6d1539e' 
        }, 
        { 
        'text': '提供市民家政、求职、房屋出租、二手物品买卖等一站式服务', 
        'subpath': '/shfw/gqfw/gqfwlb/index.html', 
        'subtitle': '供求服务', 
        'path': '/shfw/index.html', 
        'children': [
            { 
                'path': '/shfw/sqfw/sqfwlb/index.html', 
                'lmmc': '社区服务', 
                'uuid': '381ea3cf8c9411e7aa6effc3b6d1539e' 
            }, 
            { 
                'path': '/shfw/wyfw/gslb/index.html', 
                'lmmc': '物业服务', 
                'uuid': '5be4d0008c9411e7aa6effc3b6d1539e' 
            }, 
            { 
                'path': '/shfw/ylfw/index.html', 
                'lmmc': '养老服务', 
                'uuid': 'dc9abd218df211e79ec795f7d0079b2b' 
            }, 
            { 
                'path': '/shfw/gqfw/gqfwlb/index.html', 
                'lmmc': '就业服务', 
                'uuid': 'b63c8f228c9411e7aa6effc3b6d1539e' 
            }, 
            { 
                'path': '/shfw/bmfw/index.html', 
                'lmmc': '便民服务', 
                'uuid': 'c48999b38c9411e7aa6effc3b6d1539e' 
            }, 
            { 
                'path': '/shfw/kdcx/index.html', 
                'lmmc': '快递服务', 
                'uuid': 'f7606e958c9411e7aa6effc3b6d1539e' 
            }, 
            { 
                'path': '/shfw/jkfw/index.html', 
                'lmmc': '健康服务', 
                'uuid': '02159e328df311e79ec795f7d0079b2b' 
            }, 
            { 
                'path': '/shfw/jffw/index.html', 
                'lmmc': '缴费服务', 
                'uuid': '933657918c9411e7aa6effc3b6d1539e' 
            }
        ], 
        'show': false, 
        'lmmc': '生活服务', 
        'uuid': '5', 
        'subuuid': '0b5afbee8c9411e7aa6effc3b6d1539e' 
        }
    ] 
};
module.exports = lw;
