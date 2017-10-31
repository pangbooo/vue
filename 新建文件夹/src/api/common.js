/**
 * 通用型API封装，所有调用api的地方都将统一引用
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { MessageBox } from 'element-ui';
import md5 from 'js-md5';
function messageBox(message) {
      MessageBox(message, '系统消息', {
            confirmButtonText: '确定',
            type: 'error'
      });
}
function setBatchArgument(params) {
      let param = {};
      let script = params['script'];
      if (!params) {
            MessageBox('参数不能为空');
            return;
      }
      if (!params['script']) {
            MessageBox('【script】参数不能为空');
            return;
      }
      if (params['replaceMap']) {
            param['replaceMap'] = JSON.stringify(params['replaceMap']);
      } else {
            param['replaceMap'] = {};
            param['replaceMap'] = JSON.stringify(param['replaceMap']);
      }
      params['script'] = [];
      params['keys'] = [];
      for (let a = 0; a < params['args'].length; a++) {
            params['script'].push(script);
            params['keys'].push([]);
      }
      param['script'] = JSON.stringify(params['script']);
      param['args'] = JSON.stringify(params['args']);
      param['keys'] = JSON.stringify(params['keys']);
      return qs.stringify(param);
}
function setArgument(params) {
      if (!params) {
            MessageBox('参数不能为空');
            return;
      }
      if (!params['script']) {
            MessageBox('【script】参数不能为空');
            return;
      }
      if (params['replaceMap']) {
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
      } else {
            params['replaceMap'] = {};
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
      }
      if (params['args'] && params['args'].length > 0) {
            var argStr = '[';
            for (let i = 0; i < params['args'].length; i++) {
                  if (i === params['args'].length - 1) {
                        argStr += '"' + params['args'][i] + '"';
                  } else {
                        argStr += '"' + params['args'][i] + '",';
                  }
            }
            argStr += ']';
            params['args'] = argStr;
      } else {
            params['args'] = '[]';
      }
      params['keys'] = '[]';
      return qs.stringify(params);
}
// 执行execute操作
export const dbexecute = (params) => {
      params = setArgument(params);
      return axios.post('/control/execute.view', params).then(res => res.data);
};
// 批量执行sql接口
export const dbbatchExecute = (params) => {
      params = setBatchArgument(params);
      return axios.post('/control/batchExecute.view', params).then(res => res.data);
};
// 获取数据列表，带有分页功能
export const dbgetGrid = (params) => {
      if (!params['pageSize']) {
            params['pageSize'] = 10;
            //  MessageBox('分页列表【pageSize】参数不能为空');
            //  return;
      }
      if (!params['nowPage']) {
            params['nowPage'] = 1;
            // MessageBox('分页列表【nowPage】参数不能为空');
            // return;
      }
      params = setArgument(params);
      return axios.post('/control/getGrid.view', params).then(res => res.data);
};
// 获取总数
export const dbgetCount = (params) => {
      params = setArgument(params);
      return axios.post('/control/getCount.view', params).then(res => res.data);
};
// 获取数据列表
export const dbgetList = (params) => {
      params = setArgument(params);
      return axios.post('/control/getList.view', params).then(res => res.data);
};

// 获取单条数据，如果sql执行结果返回多条记录，那么取第一条
export const dbgetMap = (params) => {
      params = setArgument(params);
      return axios.post('/control/getMap.view', params).then(res => res.data);
};

// 获取导航信息列表
export const getNavbarService = (params) => {
      let param = {};
      if (params.puuid) {
            param.puuid = params.puuid;
      }
      // params['operatorId'] = '47c2c4885e07b711015e17087c080074';
      // /web/getAllFrontById?frontId=47c2c4885e07b711015e17087c080074
      // web/lw/
      return axios.post('web/lw', qs.stringify(param)).then(res => res.data);
};

// 表单保存
// params.tableId 表单的tableId值
// params.params 需要保存的存及更新的值。
// params.字段中文名：必须使用字段的中文名称
// 如果params.params.uuid有值，那么将会进行更新操作,其他为保存操作。
export const saveFormService = (params) => {
      let param = {};
      if (!params.tableId) {
            MessageBox('【tableId】参数不能为空');
      } else {
            param.tableId = params.tableId;
      }
      if (!params.params) {
            MessageBox('【params】参数不能为空');
      }
      param.param = JSON.stringify(params.params);
      // /web/webSaveForm  不带状态
      // oApp/singleSave   需要session
      return axios.post('/web/webSaveForm', qs.stringify(param)).then(res => res.data);
};
// 文章保存
// params.tableId 表单的tableId值
// params.lmids 栏目id 数组json
// params.params 需要保存的存及更新的值。
// params.字段中文名：必须使用字段的中文名称
// 如果params.params.uuid有值，那么将会进行更新操作,其他为保存操作。
export const saveWZService = (params) => {
      let param = {};
      if (!params.tableId) {
            MessageBox('【tableId】参数不能为空');
      } else {
            param.tableId = params.tableId;
      }
      if (!params.lmids) {
            MessageBox('【lmids】参数不能为空');
      } else {
            param.lmids = params.lmids;
      }
      if (!params.params) {
            MessageBox('【params】参数不能为空');
      }
      param.param = JSON.stringify(params.params);
      // /web/webSaveForm  不带状态
      // oApp/singleSave   需要session
      // console.log(param);
      return axios.post('/webAdmin/saveWZForm', qs.stringify(param)).then(res => res.data);
};
// 获取表单
// params.tableId 表单的tableId值
// params.uuid 数据uuid
export const getForm = (params) => {
      let param = {};
      if (!params.tableId) {
            MessageBox('【tableId】参数不能为空');
      } else {
            param.tableId = params.tableId;
      }
      if (!params.uuid) {
            MessageBox('【uuid】参数不能为空');
      } else {
            param.uuid = params.uuid;
      }
      if (params.isll) {
            param.isll = params.isll;
      }else{
            // param.isll=true;
      }
      // /web/webSaveForm  不带状态
      // oApp/singleSave   需要session
      return axios.post('/web/webSelectForm', qs.stringify(param)).then(res => res.data);
};
/**
 * 数据删除接口
 */
export const deleteData = (params) => {
      let param = {};
      if (!params.tableId) {
            MessageBox('【tableId】参数不能为空');
      } else {
            param.tableId = params.tableId;
      }
      param.uuids = JSON.stringify(params.uuids);
      return axios.post('/web/webCommonDelByIds', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取用户操作集接口
 * POST /oApp/getAllOperate
 */
export const getAllOperate = (params) => {
      return axios.post('/oApp/getAllOperate', qs.stringify(params)).then(res => res.data);
};
/**
 * 文件上传接口
 */
export const uploadFile = (params) => {
      // if (!params.tableId) {
      //       MessageBox('【tableId】参数不能为空');
      //       return;
      // }
      // if (!params.ATTACH_ID) {
      //       MessageBox('【ATTACH_ID】参数不能为空');
      //       return;
      // }
      // if (!params.FIELDNAME) {
      //       MessageBox('【FIELDNAME】参数不能为空');
      //       return;
      // }

      return axios.post('/oApp/upload', params).then(res => res.data);
};
/**
 * @param {*} params
 * 注册接口
 */
export const register = (params) => {
      let param = {};
      let tempParam = {};
      tempParam.yhmc = params.yhmc;
      tempParam.manageType = params.manageType;
      tempParam.nc = params.nc;
      tempParam.mm = md5(params.mm);
      tempParam.checkCode = params.checkCode;
      param.jsonMap = JSON.stringify(tempParam);
      return axios.post('/web/qyglOrYhglRegister', qs.stringify(param)).then(res => res.data);
};

/**
 * 获取验证码
 */
export const getCode = () => {
      let params = { aa: 1 };
      return axios.post('/oApp/getCode', qs.stringify(params)).then(res => res.data);
};
/**
 * 获取栏目自定义字段列表
 * @param {lmid:lmid} params
 * key: lmid:值  栏目ID
 */
export const getLmzdyzdList = (params) => {
      return axios.post('/web/getLmzdyzdList', qs.stringify(params)).then(res => res.data);
};

/**
 * 通用排序接口
 * @param {*} params
 */
export const commonSort = (params) => {
      let param = {};
      if (!params.tableId) {
            MessageBox('【tableId】参数不能为空');
            return;
      } else {
            param.tableId = params.tableId;
      }
      if (!params.uuids) {
            MessageBox('【uuids】参数不能为空');
            return;
      } else {
            param.lmids = JSON.stringify(params.uuids);
            // console.log(param);
      }
      return axios.post('/web/commonSort', qs.stringify(param)).then(res => res.data);
};

/**
 * 获取文章列表接口
 * @param {LMID:栏目ID,nowPage:第几页,默认为1,pageSize:每页几个,默认10,zyxOrDjl排序字段,filter{中文字段：字段值}}
 * 不传按照重要性排序，传值为字符串，传值只能为djl或者zyx,前者为按照点击率排序} params
 * filter{中文字段：字段值};
 */
export const webGetWZGrid = (params) => {
      let param = {};
      if (!params.LMID) {
            MessageBox('【LMID】参数不能为空');
            return;
      } else {
            param.LMID = params.LMID;
      }
      // if (!params.zyxOrDjl) {
      //       MessageBox('【zyxOrDjl】参数不能为空');
      //       return;
      // } else {
      //       param.zyxOrDjl = params.zyxOrDjl;
      // }
      if (!params.nowPage) {
            // MessageBox('【nowPage】参数不能为空');
            param.nowPage = 1;
      } else {
            param.nowPage = params.nowPage;
      }
      if (!params.pageSize) {
            // MessageBox('【pageSize】参数不能为空');
            param.pageSize = 10;
      } else {
            param.pageSize = params.pageSize;
      }
      if (params.filter) {
            param.filter = JSON.stringify(params.filter);
      }
      return axios.post('/web/webGetWZLB', qs.stringify(param)).then(res => res.data);
};

/**
 * 获取子栏目树接口
 * @param {puuid 父栏目ID,level 取多少级，默认为1级} params
 */
export const webGetLMTree = (params) => {
      // POST /web/getTitleTree
      let param = {};
      if (!params.puuid) {
            MessageBox('【puuid】参数不能为空');
            return;
      } else {
            param.puuid = params.puuid;
      }
      if (!params.level) {
            param.level = 1;
      } else {
            param.level = params.level;
      }
      return axios.post('/web/getTitleTree', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取文章
 * @param 参数 tableId（表单id） uuid（文章id）
 */
export const getArticle = (params) => {
      // POST /web/getTitleTree
      let param = {};
      if (!params.tableId) {
            MessageBox('【tableId】参数不能为空');
            return;
      } else {
            param.tableId = params.tableId;
      }
      if (!params.uuid) {
            MessageBox('【uuid】参数不能为空');
            return;
      } else {
            param.uuid = params.uuid;
      }
      return axios.post('/web/getArticle', qs.stringify(param)).then(res => res.data);
};

/**
 * 文件下载，图片显示
 * @param {tableId:表ID,uuid:Blob表uuid,isBase64:true/false,true为返回baseb4,false二进制流} params
 */
export const webDownload = (params) => {
      let param = {};
      if (!params.tableId) {
            MessageBox('【tableId】参数不能为空');
            return;
      } else {
            param.tableId = params.tableId;
      }
      if (!params.uuid) {
            MessageBox('【uuid】参数不能为空');
            return;
      } else {
            param.uuid = params.uuid;
      }
      if (!params.isBase64) {
            param.isBase64 = 'false';
      } else {
            param.isBase64 = params.isBase64;
      }
      return axios.post('/web/webDownload', qs.stringify(param)).then(res => res.data);
};

/**
 * 获取点击率文章排行列表
 * @param {tableId:表ID} params
 */
export const getArticleTitleClickList = (params) => {
      let param = {};
      if (!params.puuid) {
            MessageBox('【puuid】参数不能为空');
            return;
      } else {
            param.puuid = params.puuid;
      }
      if (!params.pageSize) {
            param.pageSize = 10;
      } else {
            param.pageSize = params.pageSize;
      }
      return axios.post('/web/getArticleTitleClickList', qs.stringify(param)).then(res => res.data);
};
// web/webGetWZPLLB
/**
 * 获取文章评论列表
 * @param {*} params
 */
export const webGetWZPLLB = (params) => {
      let param = {};
      if (!params.WZID) {
            MessageBox('【WZID】参数不能为空');
            return;
      } else {
            param.WZID = params.WZID;
      }
      if (!params.nowPage) {
            // MessageBox('【nowPage】参数不能为空');
            param.nowPage = 1;
      } else {
            param.nowPage = params.nowPage;
      }
      if (!params.pageSize) {
            // MessageBox('【nowPage】参数不能为空');
            param.pageSize = 10;
      } else {
            param.pageSize = params.pageSize;
      }
      return axios.post('web/webGetWZPLLB', qs.stringify(param)).then(res => res.data);
};
// 获取平均评分及总条数
// uuid 文章id
export const getArticleCommentCountAndAvg = (params) => {
      let param = {};
      if (!params.wzid) {
            MessageBox('【wzid】参数不能为空');
      } else {
            param.wzid = params.wzid;
      }
      // /web/webSaveForm  不带状态
      // oApp/singleSave   需要session
      return axios.post('/web/getArticleCommentCountAndAvg', qs.stringify(param)).then(res => res.data);
};

// 栏目子列表分页接口
export const getTitleChildCountList = (params) => {
      let param = {};
      if (!params.puuid) {
            MessageBox('【puuid】参数不能为空');
      } else {
            param.puuid = params.puuid;
      }
      param.nowPage = params.nowPage || 1;
      param.pageSize = params.pageSize || 10;
      return axios.post('/web/getTitleChildCountList', qs.stringify(param)).then(res => res.data);
};

/**
 * 批量设置文章推荐
 * @param {*} params
 */
export const updateArticleTJ = (params) => {
      return dbbatchExecute(params);
};
/**
 * 获取推荐商家列表
 * @param {*} params
 */
export const getBusinessRecommendList = (params) => {
      let param = {};
      if (!params.lmid) {
            MessageBox('【lmid】参数不能为空');
      } else {
            param.lmid = params.lmid;
      }
      if (!params.ntype) {
            param.ntype = null;
      } else {
            param.ntype = params.ntype;
      }
      if (!params.nowPage) {
            // MessageBox('【nowPage】参数不能为空');
            param.nowPage = 1;
      } else {
            param.nowPage = params.nowPage;
      }
      if (!params.pageSize) {
            // MessageBox('【nowPage】参数不能为空');
            param.pageSize = 10;
      } else {
            param.pageSize = params.pageSize;
      }
      return axios.post('/web/getBusinessRecommendList', qs.stringify(param)).then(res => res.data);
};

/**
 * 获取推荐社区
 * @param {*} params
 */
export const webGetLMWZList = (params) => {
      let param = {};
      if (!params.puuid) {
            MessageBox('【puuid】参数不能为空');
      } else {
            param.puuid = params.puuid;
      }
      if (!params.nowPage) {
            param.nowPage = 1;
      } else {
            param.nowPage = params.nowPage;
      }
      if (!params.pageSize) {
            param.pageSize = 10;
      } else {
            param.pageSize = params.pageSize;
      }
      return axios.post('/web/webGetLMWZList ', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取某栏目下子栏目名称的栏目列表(被推荐的)
 * @param {*} eg：lmid = 社区栏目id;childlmmc = 社区活动;
 */
export const getChildLmWz = (params) => {
      let param = {};
      if (!params.lmid) {
            MessageBox('【lmid】参数不能为空');
      } else {
            param.lmid = params.lmid;
      }
      if (!params.childlmmc) {
            MessageBox('【childlmmc】参数不能为空');
      } else {
            param.childlmmc = params.childlmmc;
      }
      if (!params.nowPage) {
            param.nowPage = 1;
      } else {
            param.nowPage = params.nowPage;
      }
      if (!params.pageSize) {
            param.pageSize = 10;
      } else {
            param.pageSize = params.pageSize;
      }
      return axios.post('/web/getChildLmWz', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取文章上层栏目id
 * @param {*} eg：wzid = 文章id;
 */
export const webGetParentsLmByWzid = (params) => {
      let param = {};
      if (!params.wzid) {
            MessageBox('【wzid】参数不能为空');
            return;
      } else {
            param.wzid = params.wzid;
      }
      if (!params.nowPage) {
            param.nowPage = 1;
      } else {
            param.nowPage = params.nowPage;
      }
      if (!params.pageSize) {
            param.pageSize = 10;
      } else {
            param.pageSize = params.pageSize;
      }
      return axios.post('/web/webGetParentsLmByWzid', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取通用列表数据,带分页
 * @param {*} params
 */
// web/webGetSimpleGridList
export const webGetSimpleGridList = (params) => {
      let param = {};
      if (!params.tableid) {
            MessageBox('【tableid】参数不能为空');
            return;
      } else {
            param.tableid = params.tableid;
      }
      if (!params.nowPage) {
            param.nowPage = 1;
      } else {
            param.nowPage = params.nowPage;
      }
      if (!params.pageSize) {
            param.pageSize = 10;
      } else {
            param.pageSize = params.pageSize;
      }
      if (params.searchKeyFields) {
            param.searchKeyFields = JSON.stringify(params.searchKeyFields);
      }
      if (params.filter) {
            param.filter = JSON.stringify(params.filter);
      }
      return axios.post('/web/webGetSimpleGridList', qs.stringify(param)).then(res => res.data);
};

/**
 * 文章关键字检索列表,带分页
 * @param {searchKey} params 搜索文章模糊查询条件【必填】
 */
// web/webGetSimpleGridList
export const getListByKey = (params) => {
      let param = {};
      if (!params.searchKey) {
            MessageBox('【searchKey】参数不能为空');
            return;
      } else {
            param.searchKey = params.searchKey;
      }
      if (!params.nowPage) {
            param.nowPage = 1;
      } else {
            param.nowPage = params.nowPage;
      }
      if (!params.pageSize) {
            param.pageSize = 10;
      } else {
            param.pageSize = params.pageSize;
      }
      return axios.post('/web/getArticleList', qs.stringify(param)).then(res => res.data);
};

/**
 * 获取投票结果
 * @param {*} params
 */
export const getOptionVoteResultBySubjectId = (params) => {
      let param = {};
      if (!params.subjectId) {
            MessageBox('【subjectId】参数不能为空');
            return;
      } else {
            param.subjectId = params.subjectId;
      }
      return axios.post('/web/getOptionVoteResultBySubjectId', qs.stringify(param)).then(res => res.data);
};
// POST /web/insertVoteInfo
/**
 * 投票接口
 */
export const insertVoteInfo = (params) => {
      let param = {};
      if (!params.voteOptionId) {
            MessageBox('【voteOptionId】参数不能为空');
            return;
      } else {
            param.voteOptionId = params.voteOptionId;
      }
      // if (!params.checkCode) {
      //       MessageBox('【checkCode】参数不能为空');
      // } else {
      //       param.checkCode = params.checkCode;
      // }
      return axios.post('/web/insertVoteInfo', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取办件评价结果接口
 * @param {matterid:办件的UUID值} params
 */
export const getPjjgsx = (params) => {
      let param = {};
      if (!params.matterid) {
            MessageBox('【matterid】参数不能为空');
            return;
      } else {
            param.matterid = params.matterid;
      }
      return axios.post('/web/getPjjgsx', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取评论列表信息
 * @param {*} params
 */
export const getPjjgsxList = (params) => {
      let param = {};
      if (!params.nowPage) {
            param.nowPage = 1;
      } else {
            param.nowPage = params.nowPage;
      }
      if (!params.pageSize) {
            param.pageSize = 10;
      } else {
            param.pageSize = params.pageSize;
      }
      if (params.searchKeyFields) {
            param.searchKeyFields = JSON.stringify(params.searchKeyFields);
      }
      if (params.filter) {
            param.filter = JSON.stringify(params.filter);
      }
      return axios.post('/web/getPjjgsxList', qs.stringify(param)).then(res => res.data);
};

/**
 * 获取评价结果（总体）按部门分
 * @param {*} params
 */
export const getPjjgBmList = (params) => {
      let param = {};
      if (params.nowPage) {
            param.nowPage = params.nowPage;
      } else {
            param.nowPage = 1;
      }
      if (params.pageSzie) {
            param.pageSzie = params.pageSzie;
      } else {
            param.pageSzie = 10;
      }
      return axios.post('/web/getPjjgBmList', qs.stringify(params)).then(res => res.data);
};
/**
 * 获取手机验证码
 */
export const webSendCode = (params) => {
      let param = {};
      if (!params.tel) {
            MessageBox('【tel】参数不能为空');
            return;
      }
      if (!params.checkCode) {
            MessageBox('【checkCode】参数不能为空');
            return;
      }
      return axios.post('/web/webSendCode', qs.stringify(params)).then(res => res.data);
};
/**
 * 获取办件待办已办
 */
export const getBjtjByUser = () => {
      return axios.post('/webAdmin/getBjtjByUser', qs.stringify()).then(res => res.data);
};
/**
 * 获取投资领域列表数据
 * @param {*} params
 */
// web/getFmqdTzly 
export const getFmqdTzly = () => {
      return axios.post('/web/getFmqdTzly', qs.stringify()).then(res => res.data);
};
/**
 * 获取负面清单类别列表数据
 * @param {*} params
 */
// web/getFmqdlb 
export const getFmqdlb = (params) => {
      let param = {};
      if (!params.tzly) {
            MessageBox('【tzly】参数不能为空');
            return;
      } else {
            param.tzly = params.tzly;
      }
      return axios.post('/web/getFmqdlb', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取负面清单内容数据
 * @param {*} params
 */
// web/getFmqd 
export const getFmqd = (params) => {
      let param = {};
      if (!params.tzly) {
            MessageBox('【tzly】参数不能为空');
            return;
      } else {
            param.tzly = params.tzly;
      }
      if (!params.lb) {
            MessageBox('【lb】参数不能为空');
            return;
      } else {
            param.lb = params.lb;
      }
      return axios.post('/web/getFmqd', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取快递信息
 * @param {*} params 
 */
export const webGetExpress = (params) => {
      let param = {};
      if (!params.num) {
            MessageBox('【num】参数不能为空');
            return;
      } else {
            param.num = params.num;
      }
      return axios.post('/web/webGetExpress', qs.stringify(param)).then(res => res.data);
};
//POST /web/webUpload
/**
 * 文件上传接口
 */
export const webUpload = (params) => {
      return axios.post('/web/webUpload', params).then(res => res.data);
};
/**
 * 获取文件列表接口
 */
export const webCommonFileList = (params) => {
      let param = {};
      if (!params.tableId) {
            MessageBox('【tableId】参数不能为空');
            return;
      } else {
            param.tableId = params.tableId;
      }
      if (!params.uuid) {
            MessageBox('【uuid】参数不能为空');
            return;
      } else {
            param.uuid = params.uuid;
      }
      if (!params.fieldName) {
            param.fieldName = 'fj';
      } else {
            param.fieldName = params.fieldName;
      }
      return axios.post('/web/webCommonFileList', qs.stringify(param)).then(res => res.data);
};
export const webCheckCode = (params) => {
      let param = {};
      if (!params.checkCode) {
            MessageBox('【checkCode】参数不能为空');
            return;
      } else {
            param.checkCode = params.checkCode;
      }
      return axios.post('/web/webCheckCode', qs.stringify(param)).then(res => res.data);
};