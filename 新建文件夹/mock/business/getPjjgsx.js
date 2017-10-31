// 接口描述:获取办件事项评价接口
// 接口详细地址:/web/getPjjgsx
// 参数:审核[0为审核不通过,1为审核过,空为未审核,其他为所有]：sh栏目id【必填】：lmid、页码:nowPage、显示行数:pageSize
const getPjjgsx = {
  'code': 'idt-oApp-5000',
  'message': '操作成功',
  'data': {
    sum: [{ 'PJJG': '1', PFJGZJ: '41' },
    { 'PJJG': '2', PFJGZJ: '41' },
    { 'PJJG': '3', PFJGZJ: '41' },
    { 'PJJG': '4', PFJGZJ: '41' },
    { 'PJJG': '5', PFJGZJ: '5' }],
    avg: {
      AVG: 7
    }
  }
};
module.exports = getPjjgsx;