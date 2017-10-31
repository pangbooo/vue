/*
 * 地区数据
 * @Author: kong
 * @Date: 2017-09-19 17:09:14
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2017-09-19 17:27:31
 */
const areaJson = {
    'shengz': [{
        'id': '01',
        'title': '省发展改革委',
        'url': '#'
    }, {
        'id': '02',
        'title': '省经信委',
        'url': '#'
    }, {
        'id': '03',
        'title': '省教育厅',
        'url': '#'
    }, {
        'id': '04',
        'title': '省科技厅',
        'url': '#'
    }, {
        'id': '05',
        'title': '省民宗委',
        'url': '#'
    }, {
        'id': '06',
        'title': '省公安厅',
        'url': '#'
    }, {
        'id': '07',
        'title': '省国家安全厅',
        'url': '#'
    }, {
        'id': '08',
        'title': '省民政厅',
        'url': '#'
    }, {
        'id': '09',
        'title': '省司法厅',
        'url': '#'
    }, {
        'id': '10',
        'title': '省财政厅',
        'url': '#'
    }, {
        'id': '11',
        'title': '省人力社保厅',
        'url': '#'
    }, {
        'id': '12',
        'title': '省国土资源厅',
        'url': '#'
    }, {
        'id': '13',
        'title': '省环保厅',
        'url': '#'
    }, {
        'id': '14',
        'title': '省建设厅',
        'url': '#'
    }, {
        'id': '15',
        'title': '省农业厅',
        'url': '#'
    }, {
        'id': '16',
        'title': '省林业厅',
        'url': '#'
    }, {
        'id': '17',
        'title': '省商务厅',
        'url': '#'
    }, {
        'id': '18',
        'title': '省文化厅',
        'url': '#'
    }, {
        'id': '19',
        'title': '省卫生计生委',
        'url': '#'
    }],
    'area': [{
        'id': '01',
        'title': '大连市',
        'children': [{
            'id': '0101',
            'title': '中山区',
            'children': [{
                'id': '010101',
                'title': '红旗街道',
                'children': null
            }, {
                'id': '010102',
                'title': '红凌桥街道',
                'children': null
            }, {
                'id': '010103',
                'title': '柳树街道',
                'children': null
            }]
        }, {
            'id': '0102',
            'title': '西岗区',
            'children': [{
                'id': '010201',
                'title': '马栏街道',
                'children': null
            }, {
                'id': '010202',
                'title': '西安路街道',
                'children': null
            }]
        }, {
            'id': '0102',
            'title': '沙河口区',
            'children': [{
                'id': '010201',
                'title': '马栏街道',
                'children': null
            }, {
                'id': '010202',
                'title': '西安路街道',
                'children': null
            }]
        }, {
            'id': '0101',
            'title': '甘井子区',
            'children': [{
                'id': '010101',
                'title': '红旗街道',
                'children': null
            }, {
                'id': '010102',
                'title': '红凌桥街道',
                'children': null
            }, {
                'id': '010103',
                'title': '柳树街道',
                'children': null
            }]
        }, {
            'id': '0101',
            'title': '高新区',
            'children': [{
                'id': '010101',
                'title': '红旗街道',
                'children': null
            }, {
                'id': '010102',
                'title': '红凌桥街道',
                'children': null
            }, {
                'id': '010103',
                'title': '柳树街道',
                'children': null
            }]
        }, {
            'id': '0101',
            'title': '金普新区',
            'children': [{
                'id': '010101',
                'title': '红旗街道',
                'children': null
            }, {
                'id': '010102',
                'title': '红凌桥街道',
                'children': null
            }, {
                'id': '010103',
                'title': '柳树街道',
                'children': null
            }]
        }, {
            'id': '0101',
            'title': '普兰店市',
            'children': [{
                'id': '010101',
                'title': '红旗街道',
                'children': null
            }, {
                'id': '010102',
                'title': '红凌桥街道',
                'children': null
            }, {
                'id': '010103',
                'title': '柳树街道',
                'children': null
            }]
        }, {
            'id': '0101',
            'title': '瓦房店市',
            'children': [{
                'id': '010101',
                'title': '红旗街道',
                'children': null
            }, {
                'id': '010102',
                'title': '红凌桥街道',
                'children': null
            }, {
                'id': '010103',
                'title': '柳树街道',
                'children': null
            }]
        }, {
            'id': '0101',
            'title': '庄河市',
            'children': null
        }]
    }, {
        'id': '02',
        'title': '沈阳市',
        'children': [{
            'id': '0201',
            'title': '大东区',
            'children': [{
                    'id': '020101',
                    'title': '辽中县',
                    'children': null
                }, {
                    'id': '020102',
                    'title': '法库县',
                    'children': null
                }

            ]
        }, {
            'id': '0202',
            'title': '东陵区',
            'children': [{
                'id': '020203',
                'title': '康平县',
                'children': null
            }]

        }]
    }]
};
module.exports = areaJson;
