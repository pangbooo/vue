// 接口描述:获取文章评论分页列表
// 接口详细地址:/web/webGetWZPLLB
// 参数:文章id:WZID、页码:nowPage、显示行数:pageSize
const webGetWZPLLB= {
  'code': 'idt-oApp-5000',
  'message': '操作成功',
  'data': {
    'nextPage': 1,
    'totalRows': 10,
    'DataList': [
      {
        'PLR': '网站管理员',
        'INSERT_DATE': 1505182188000,
        'ODY': 1,
        'PLSJ': 1505442012000,
        'XJ': '3',
        'PLNR': '4444444'
      },
    ],
    'previousPage': 1,
    'totalPages': 1
  }
};
module.exports = webGetWZPLLB;
