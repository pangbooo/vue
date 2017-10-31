/**
 * 文件描述：配置本地服务，如果开启了代理模式，该接口将不进行调用。
 *
 *
 * 作者：尧永中
 * 日期：2017年6月1日
 *
 */
let mockData = {
      path: '',
      data: {}
};
/***
 * 上面接口先不动
 * ***************新增数据接口开始线************
 */

/** *************** 管理端接口************************** */
mockData.data['oApp/getCode'] = require('./manage/getCode.js');
mockData.data['oApp/login'] = require('./manage/login.js');
mockData.data['oApp/getAllOperate'] = require('./manage/getAllOperate.js');
mockData.data['webAdmin/deleteUserAccountByUserName'] = require('./manage/deleteUserAccountByUserName.js');
mockData.data['webAdmin/getTitlePermission'] = require('./manage/getTitlePermission.js');
mockData.data['webAdmin/getUserInfoAndBuinessInfoList'] = require('./manage/getUserInfoAndBuinessInfoList.js');
mockData.data['webAdmin/tokenWhetherPast'] = require('./manage/tokenWhetherPast.js');
mockData.data['webAdmin/updateZhztByUserName'] = require('./manage/updateZhztByUserName.js');
mockData.data['webAdmin/ebGetLmTreeByRole'] = require('./manage/webGetLmTreeByRole.js');
mockData.data['webAdmin/webGetWzListByRole'] = require('./manage/webGetWzListByRole.js');
mockData.data['webAdmin/webUpdateBatch'] = require('./manage/webUpdateBatch.js');
mockData.data['webAdmin/webGetMySimpleGridList'] = require('./manage/webGetMySimpleGridList.js');
mockData.data['oApp/modifyPwd'] = require('./manage/modifyPwd.js');
mockData.data['webAdmin/getBjtjByUser'] = require('./manage/getBjtjByUser.js');
mockData.data['webAdmin/getMyFavorites'] = require('./manage/getMyFavorites.js');
mockData.data['oApp/logout'] = require('./manage/logout.js');
mockData.data['webAdmin/webSaveMyForm'] = require('./common/webSaveForm.js');
mockData.data['webAdmin/webApplyMatter'] = require('./common/webSaveForm.js');
mockData.data['webAdmin/getSxInfo'] = require('./manage/getSxInfo.js');
mockData.data['webAdmin/getUserAndCompanyManagerInfo'] = require('./manage/getUserAndCompanyManagerInfo.js');
mockData.data['webAdmin/getMyPjList'] = require('./manage/getMyPjList.js');
mockData.data['webAdmin/checkWhetherAppraise'] = require('./manage/checkWhetherAppraise.js');
/** *****************通用型接口************************** */
mockData.data['web/webSaveForm'] = require('./common/webSaveForm.js');
mockData.data['web/webSelectForm'] = require('./common/webSelectForm.js');
mockData.data['webAdmin/saveWZForm'] = require('./common/saveWZForm.js');
mockData.data['web/commonSort'] = require('./common/commonSort.js');
mockData.data['web/webCommonDelByIds'] = require('./common/webCommonDelByIds.js');
mockData.data['web/webCommonFileList'] = require('./common/webCommonFileList.js');
mockData.data['web/webGetSimpleGridList'] = require('./common/webGetSimpleGridList.js');
/** **************业务型接口*********************************** */
mockData.data['web/webDownload'] = require('./business/webDownload.js');
mockData.data['web/addUserToPost'] = require('./business/addUserToPost.js');
mockData.data['web/deletePostNameInfo'] = require('./business/deletePostNameInfo.js');
mockData.data['web/getAllFrontById'] = require('./business/getAllFrontById.js');
mockData.data['web/getArticle'] = require('./business/getArticle.js');
mockData.data['web/getArticleCommentCountAndAvg'] = require('./business/getArticleCommentCountAndAvg.js');
mockData.data['web/getArticleList'] = require('./business/getArticleList.js');
mockData.data['web/getArticleTitleClickList'] = require('./business/getArticleTitleClickList.js');
mockData.data['web/getAuditList'] = require('./business/getAuditList.js');
mockData.data['web/getBusinessRecommendList'] = require('./business/getBusinessRecommendList.js');

mockData.data['web/getChildLmWz'] = require('./business/getChildLmWz.js');
mockData.data['web/getDepartmentPersionnelTreeList'] = require('./business/getDepartmentPersionnelTreeList.js');
mockData.data['web/getLmidByWzid'] = require('./business/getLmidByWzid.js');
mockData.data['web/getLmzdyzdList'] = require('./business/getLmzdyzdList.js');
mockData.data['oApp/login'] = require('./business/getLogin.js');
mockData.data['web/getOptionVoteResultBySubjectId'] = require('./business/getOptionVoteResultBySubjectId.js');
mockData.data['web/getPostNameInfo'] = require('./business/getPostNameInfo.js');
mockData.data['web/getTitleChildCountList'] = require('./business/getTitleChildCountList.js');
mockData.data['web/getTitleChildList'] = require('./business/getTitleChildList.js');
mockData.data['web/getTitleNameLimitList'] = require('./business/getTitleNameLimitList.js');
mockData.data['web/getTitleTree'] = require('./business/getTitleTree.js');
mockData.data['web/getVoteSubjectDetailInfo'] = require('./business/getVoteSubjectDetailInfo.js');
mockData.data['web/insertLimitInfo'] = require('./business/insertLimitInfo.js');
mockData.data['web/insertLmglInfo'] = require('./business/insertLmglInfo.js');
mockData.data['web/insertOrUpdatePostNameInfo'] = require('./business/insertOrUpdatePostNameInfo.js');
mockData.data['web/insertVoteInfo'] = require('./business/insertVoteInfo.js');
mockData.data['web/insertWzylmdybInfo'] = require('./business/insertWzylmdybInfo.js');
mockData.data['web/isExistXydmOrYhmc'] = require('./business/isExistXydmOrYhmc.js');
mockData.data['web/lw'] = require('./business/lw.js');
mockData.data['web/pasteTitleAndFieldInfo'] = require('./business/pasteTitleAndFieldInfo.js');
mockData.data['web/qyglOrYhglRegister'] = require('./business/qyglOrYhglRegister.js');
mockData.data['web/ueditorController'] = require('./business/ueditorController.js');
mockData.data['web/updateSfxsByUuid'] = require('./business/updateSfxsByUuid.js');
mockData.data['web/updateWhetherPassByUuid'] = require('./business/updateWhetherPassByUuid.js');
mockData.data['web/updateWhetherRecommendOrUpByUuid'] = require('./business/updateWhetherRecommendOrUpByUuid.js');
mockData.data['web/webDelFile'] = require('./business/webDelFile.js');
mockData.data['web/webGetLMWZList'] = require('./business/webGetLMWZList.js');
mockData.data['web/webGetParentsLmByWzid'] = require('./business/webGetParentsLmByWzid.js');
mockData.data['web/webGetWZLB'] = require('./business/webGetWZLB.js');
mockData.data['web/webGetWZPLLB'] = require('./business/webGetWZPLLB.js');
mockData.data['oApp/upload'] = require('./business/webUpload.js');
mockData.data['web/webGetMatterByUuid'] = require('./business/getMatterInfo.js');
mockData.data['web/getBMList'] = require('./business/getBMList.js');
mockData.data['web/getSpMattersList'] = require('./business/getSpMattersList.js');
// mockData.data['oApp/upload'] = require('./business/upload.js');
mockData.data['web/getPjjgsx'] = require('./business/getPjjgsx.js');
mockData.data['web/getPjjgsxList'] = require('./business/getPjjgsxList.js');
mockData.data['web/webGetExpress'] = require('./business/getWebExpress.js');
mockData.data['web/getPjjgBmList'] = require('./business/getPjjgBmList.js');
mockData.data['web/getFmqdTzly'] = require('./business/getFmqdTzly.js');
mockData.data['web/getFmqdlb'] = require('./business/getFmqdlb.js');
mockData.data['web/getFmqd'] = require('./business/getFmqd.js');
/**
 * ****************新增数据接口结束线*********************
 */
module.exports = mockData;
