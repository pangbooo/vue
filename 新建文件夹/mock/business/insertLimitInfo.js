// 接口描述:插入栏目对应权限接口
// 接口详细地址:/web/insertLimitInfo
// 参数:limitjson：value = '区分推荐和置顶.<br/>'
//    + '{<br/>'
// + '【UUID】:主键,<br/>'
// + '【LMID】:栏目id【必填】,<br/>'
// + '【LLQX】:浏览权限,<br/>'
// + '【TJQX】:添加权限,<br/>'
// + '【XGQX】:修改权限,<br/>'
// + '【SCQX】:删除权限,<br/>'
// + '【ZDQX】:置顶权限,<br/>'
// + '【SHQX】:审核权限,<br/>'
// + '【WZTJ】:推荐权限,<br/>'
// + '【GRQX】:个人权限,<br/>'
// + '}<br/>')
// 岗位id【必填】：jsid
const insertLimitInfo= {
  'code': 'idt-oApp-5000',
  'message': '操作成功',
  'data': 1
};
module.exports = insertLimitInfo;
