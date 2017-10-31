const structure = [
    // 首页
    {id: 'index', pid: '', title: '首页', path: '/index.html', params: {}},
    {id: 'searchlist', pid: 'index', title: '搜索结果', path: '/search/searchlist/index.html', params: {}},
    {id: 'searchdetail', pid: 'searchlist', title: '内容详情', path: '/search/searchdetail/index.html', params: {}},
    // 个人中心
    {id: 'login', pid: 'index', title: '登录', path: '/user/login/index.html', params: {}},
    {id: 'personcenter', pid: 'index', title: '个人中心', path: '/user/personcenter/index.html', params: {}},
    {id: 'smrz', pid: 'personcenter', title: '实名认证', path: '/user/smrz/index.html', params: {}},
    {id: 'smrzfr', pid: 'personcenter', title: '法人实名认证', path: '/user/smrzfr/index.html', params: {}},
    {id: 'myzxlb', pid: 'personcenter', title: '我的咨询列表', path: '/zxts/myzxlb/index.html', params: {}},
    {id: 'myzxll', pid: 'myzxlb', title: '我的咨询浏览', path: '/zxts/myzxll/index.html', params: {}},
    {id: 'myjylb', pid: 'personcenter', title: '我的建议列表', path: '/zxts/myjylb/index.html', params: {}},
    {id: 'myjyll', pid: 'myjylb', title: '我的建议浏览', path: '/zxts/myjyll/index.html', params: {}},
    {id: 'mytslb', pid: 'personcenter', title: '我的投诉列表', path: '/zxts/mytslb/index.html', params: {}},
    {id: 'mytsll', pid: 'mytslb', title: '我的投诉浏览', path: '/zxts/mytsll/index.html', params: {}},
    {id: 'wdsclb', pid: 'personcenter', title: '我的收藏列表', path: '/qlqd/wdsclb/index.html', params: {}},
    {id: 'mpjlb', pid: 'personcenter', title: '我的评价列表', path: '/wsbs/mpjlb/index.html', params: {}},
    {id: 'myckpj', pid: 'mpjlb', title: '查看我的评价', path: '/wsbs/myckpj/index.html', params: {}},
    // 权力清单
    {id: 'xzqlqdlb', pid: 'index', title: '行政权力清单列表', path: '/qlqd/xzqlqdlb/index.html', params: {}},
    {id: 'xzqlqdlbygzw', pid: 'ygzw_qlqd', title: '行政权力清单列表', path: '/qlqd/xzqlqdlbygzw/index.html', params: {}},
    {id: 'xzqlqddetailygzw', pid: 'xzqlqdlbygzw', title: '行政权力清单简介', path: '/qlqd/xzqlqdbeforedetail/index.html', params: {}},
    {id: 'xzqlqddetail', pid: 'xzqlqdlb', title: '行政权力清单详情', path: '/qlqd/xzqlqddetail/index.html', params: {}},
    // 网上办事
    {id: 'hyyydj', pid: 'index', title: '婚姻预约登记', path: '/wsbs/hyyydj/index.html', params: {}},
    {id: 'sxsbdj', pid: 'xzqlqddetail', title: '事项申报登记', path: '/wsbs/sxsbdj/index.html', params: {}},
    {id: 'pjlb', pid: 'index', title: '评价列表', path: '/wsbs/pjlb/index.html', params: {}},
    {id: 'pjtj', pid: 'index', title: '评价统计', path: '/wsbs/pjtj/index.html', params: {}},
    {id: 'pjjg', pid: 'index', title: '评价结果', path: '/wsbs/pjjg/index.html', params: {}},
    {id: 'ckpj', pid: 'xzqlqddetail', title: '查看评价', path: '/wsbs/ckpj/index.html', params: {}},
     // 办件公示
    {id: 'bjgslb', pid: 'index', title: '办件公示', path: '/wsbs/bjgslb/index.html', params: {}},
    {id: 'mybjgslb', pid: 'personcenter', title: '我的办件公示', path: '/wsbs/mybjgslb/index.html', params: {}},
    {id: 'bjgsdetail', pid: 'bjgslb', title: '办件公示详细', path: '/wsbs/bjgsdetail/index.html', params: {}},
    {id: 'mybjgsdetail', pid: 'mybjgslb', title: '我的办件公示详细', path: '/wsbs/mybjgsdetail/index.html', params: {}},
    // 咨询投诉
    {id: 'zxlb', pid: 'index', title: '咨询列表', path: '/zxts/zxlb/index.html', params: {}},
    {id: 'wyzx', pid: 'zxlb', title: '我要咨询', path: '/zxts/wyzx/index.html', params: {}},
    {id: 'zxll', pid: 'zxlb', title: '咨询浏览', path: '/zxts/zxll/index.html', params: {}},
    {id: 'wyts', pid: 'tslb', title: '我要投诉', path: '/zxts/wyts/index.html', params: {}},
    {id: 'tslb', pid: 'index', title: '投诉列表', path: '/zxts/tslb/index.html', params: {}},
    {id: 'tsll', pid: 'tslb', title: '投诉浏览', path: '/zxts/tsll/index.html', params: {}},
    {id: 'jylb', pid: 'index', title: '建议列表', path: '/zxts/jylb/index.html', params: {}},
    {id: 'jydj', pid: 'jylb', title: '建议登记', path: '/zxts/jydj/index.html', params: {}},
    {id: 'jyll', pid: 'jylb', title: '建议浏览', path: '/zxts/jyll/index.html', params: {}},
    {id: 'cjwt', pid: 'index', title: '常见问题', path: '/zxts/cjwt/index.html', params: {}},
    {id: 'wtll', pid: 'cjwt', title: '问题浏览', path: '/zxts/wtll/index.html', params: {}},
    // 新闻中心
    {id: 'xwzx_tzgg_tzgglb', pid: 'index', title: '通知公告列表', path: '/xwzx/tzgg/tzgglb/index.html', params: {}},
    {id: 'xwzx_tzgg_tzggdetail', pid: 'xwzx_tzgg_tzgglb', title: '通知公告详情', path: '/xwzx/tzgg/tzggdetail/index.html', params: {}},
    // 政务服务
    {id: 'ygzw', pid: 'index', title: '阳光政务', path: '/zwfw/index.html', params: {}},
    {id: 'ygzw_qlqd', pid: 'ygzw', title: '权力清单', path: '/zwfw/ygzw/index.html', params: {}},
    {id: 'zwfw-zwfw_lb', pid: 'ygzw', title: '新闻列表', path: '/zwfw/zwfwlb/index.html', params: {}},
    {id: 'zwfw_detail', pid: 'zwfw-zwfw_lb', title: '新闻详情', path: '/zwfw/zwfwdetail/index.html', params: {}},
    {id: 'zrqdlb', pid: 'ygzw', title: '责任清单列表', path: '/qlqd/zrqdlb/index.html', params: {}},
    {id: 'zyzf', pid: 'ygzw', title: '转移支付专项', path: '/zwfw/ygzw/zxqd/zyzf/index.html', params: {}},
    {id: 'bmys', pid: 'ygzw', title: '部门预算专项', path: '/zwfw/ygzw/zxqd/bmys/index.html', params: {}},
    {id: 'fmqd', pid: 'ygzw', title: '负面清单', path: '/zwfw/ygzw/fmqd/index.html', params: {}},
    {id: 'bmfw', pid: 'index', title: '便民服务', path: '/zwfw/ygzw/bmfw/index.html', params: {}},
    // 其他服务
    {id: 'wdkd', pid: 'index', title: '我的快递', path: '/qtfw/wdkd/index.html', params: {}},
];
export default structure;
