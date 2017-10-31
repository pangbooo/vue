// 接口描述:插入岗位名称信息和修改岗位名称信息接口
// 接口详细地址:/web/insertOrUpdatePostNameInfo
// 参数:postNamejson
// value = '用于存放数据表参数。格式:以json格式传递.<br/>'
// + '{<br/>'
// + '【XH】:主键【必填】,<br/>'
// + '【MC】:岗位名称【必填】,<br/>'
// + '【XXMS】:信息描述【必填】,<br/>'
// + '}<br/>')
const insertOrUpdatePostNameInfo= {
  'code': 'idt-oApp-5000',
  'message': '操作成功',
  'data': 1
};
module.exports = insertOrUpdatePostNameInfo;
// 注：主键XH是空则插入岗位名称信息否则修改岗位名称信息