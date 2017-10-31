// 接口描述:审核不通过,审核通过 ,未审核列表（文章评论）
// 接口详细地址:/web/getAuditList
// 参数:审核[0为审核不通过,1为审核过,空为未审核,其他为所有]：sh栏目id【必填】：lmid、页码:nowPage、显示行数:pageSize
const getAuditList= {
  'code': 'idt-oApp-5000',
  'message': '操作成功',
  'data': {
    'message': 'success'
  }
};
module.exports = getAuditList;
