// 接口描述:审核不通过和审核通过接口(文章评论)
// 接口详细地址:/web/getPjjgsxList
// 参数:数据表id：tableid、排序中文字段json数组,以-号开头为倒序：orderFields、中文字段名json数组（用于模糊查询searchKey）
// :searchKeyFields、过滤	的json配置:{\'searchKey\':\'xxxxxx\',\'字段_1\':\'xxxxxx\'}:filter、是否分	页：默认true：
// isPaging、页码:nowPage、显示行数:pageSize
const getPjjgsxList = {
  'code': 'idt-oApp-5000',
  'message': '操作成功',
  'data': {
    'nextPage': 2,
    'totalRows': 281,
    'DataList': [
      {
        'dwmc': '国土局',
        'xmbh': '123456',
        'xmmc': '政策内二胎的符合条件',
        'pjhj': '评价环节',
        'pjcs': '51',
        'pjzj': '3.5'
      },
      {
        'dwmc': '国土局',
        'xmbh': '123456',
        'xmmc': '政策内二胎的符合条件',
        'pjhj': '评价环节',
        'pjcs': '51',
        'pjzj': '3.5'
      }
    ]
  }
};
module.exports = getPjjgsxList;
