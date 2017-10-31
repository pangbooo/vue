// 接口描述:文章是否推荐和文章是否置顶和取消推荐接口
// 接口详细地址:/web/updateWhetherRecommendOrUpByUuid
// 参数:needType：value = '区分推荐和置顶.<br/>'
//    + '{<br/>'
//    + '【sftj】:文章推荐,<br/>'
//    + '【sfzd】:文章置顶,<br/>'
//    + '【cancleRecommend】:取消推荐,<br/>'
//    + '}<br/>')
// 要更新的uuid json【必填】：uuids
const updateWhetherRecommendOrUpByUuid= {
  'code': 'idt-oApp-5000',
  'message': '操作成功',
  'data': 1
};
module.exports = updateWhetherRecommendOrUpByUuid;
