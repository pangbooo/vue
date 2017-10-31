// 接口描述:人员部门人员树列表接口(设置岗位)
// 接口详细地址:/web/getDepartmentPersionnelTreeList
// 参数:根节点部门Id(不填为全部树)：lsid、要选中的岗位树：gwid
const getDepartmentPersionnelTreeList= {
  'code': 'idt-oApp-5000',
  'message': '操作成功',
  'data': [
    {
      'NAME': '网站管理',
      'NTYPE': 'dept',
      'PID': '47c2c4f9235aa97f01235aa97f7c0000',
      'ID': '47c2c4885e07b711015e17d927d10097',
      'checked': false
    }
  ]
};
module.exports = getDepartmentPersionnelTreeList;
// 注：'checked': false表示没有选中节点，'checked': true表示选中节点
