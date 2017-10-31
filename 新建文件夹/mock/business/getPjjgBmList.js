// 接口描述:获取部门评价列表，把平均分进行降序
// 接口详细地址:/web/getPjjgBmList

const getPjjgBmList = {
  'code': 'idt-oApp-5000',
  'message': '操作成功',
  'data': {
    'nextPage': 2,
    'totalRows': 281,
    'DataList': [
      {
        'DWMC': '国土局',
        '1': '45',
        '2': '3',
        '3': '33',
        '4': '51',
        '5': '51',
        'AVG': '4.5'
      },
      {
        'DWMC': '交通局',
        '1': '45',
        '2': '3',
        '3': '33',
        '4': '51',
        '5': '51',
        'AVG': '4.5'
      }
    ]
  }
};
module.exports = getPjjgBmList;
