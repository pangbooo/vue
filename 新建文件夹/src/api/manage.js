/**
 * manage后台API封装，所有调用api的地方都将统一引用
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

// 插入岗位名称信息接口
export const insertOrUpdatePostNameInfo = (params) => {
    let param = {};
    param.postNamejson = JSON.stringify(params);
    return axios.post('/web/insertOrUpdatePostNameInfo', qs.stringify(param)).then(res => res.data);
};

// 删除岗位名称信息接口
export const deletePostNameInfo = (params) => {
    return axios.post('/web/deletePostNameInfo', qs.stringify(params)).then(res => res.data);
};

// 角色名称列表分页查询接口
export const getPostList = (params) => {
    params.nowPage = params.nowPage || 1;
    params.pageSize = params.pageSize || 10;
    return axios.post('/web/getPostNameList', qs.stringify(params)).then(res => res.data);
};

// 树形栏目名称对应权限列表接口
export const getPostNameLimitList = (params) => {
    return axios.post('/web/getTitleNameLimitList', qs.stringify(params)).then(res => res.data);
};

// 人员部门人员树列表接口
export const getDeptPersonTreeList = (params) => {
    return axios.post('/web/getDepartmentPersionnelTreeList', qs.stringify(params)).then(res => res.data);
};

// 插入栏目对应权限接口
export const insertLimitInfo = (params) => {
    let param = {};
    param.limitjson = JSON.stringify(params.limitjson);
    param.jsid = params.jsid;
    return axios.post('/web/insertLimitInfo', qs.stringify(param)).then(res => res.data);
};

// 插入栏目对应权限接口
export const addUserToPost = (params) => {
    let param = {};
    if (!params.gwid) {
        MessageBox('【gwid】参数不能为空');
    } else {
        param.gwid = params.gwid;
    }
    if (!params.userids) {
        MessageBox('【userids】参数不能为空');
    } else {
        param.userids = JSON.stringify(params.userids);
    }
    return axios.post('/web/addUserToPost', qs.stringify(param)).then(res => res.data);
};

/**
 * 获取所有栏目下文章评论列表
 * @param {lmid:栏目ID} params
 */
export const getAllArticleCommentsList = (params) => {
    return axios.post('/web/getAuditList', qs.stringify(params)).then(res => res.data);
};
/**
 * 评论审核通过与不通过接口
 * @param {uuids:评论UUID数组JSON串,whetherPassType:pass(通过)/nopass(不通过)} params
 */
export const updateWhetherPassByUuid = (params) => {
    let param = {};
    if (!params.whetherPassType) {
        MessageBox('【whetherPassType】参数不能为空');
    } else {
        param.whetherPassType = params.whetherPassType;
    }
    if (!params.uuids) {
        MessageBox('【uuids】参数不能为空');
    } else {
        param.uuids = JSON.stringify(params.uuids);
    }
    return axios.post('/web/updateWhetherPassByUuid', qs.stringify(param)).then(res => res.data);
};

// /web/webGetLmTreeByRole
/**
 * 根据用户权限获取栏目树列表
 * @param {*} params
 */
export const webGetLmTreeByRole = (params) => {
    let param = {};
    if (param.lmid) {
        param.lmid = params.lmid;
    }
    return axios.post('/webAdmin/webGetLmTreeByRole', qs.stringify(param)).then(res => res.data);
};

// web/webGetWzListByRole
export const webGetWzListByRole = (params) => {
    let param = {};
    if (params.puuid) {
        param.puuid = params.puuid;
    } else {
        MessageBox('【lmid】参数不能为空');
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
    return axios.post('/webAdmin/webGetWzListByRole', qs.stringify(param)).then(res => res.data);
};
// POST /webAdmin/getUserInfoAndBuinessInfoList
/**
 * 获取用户列表
 * @param {*} params
 */
export const getUserInfoAndBuinessInfoList = (params) => {
    let param = {};
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
    return axios.post('/webAdmin/getUserInfoAndBuinessInfoList', qs.stringify(params)).then(res => res.data);
};
/**
 * 删除用户
 * @param {*} params
 */
export const deleteUserAccountByUserName = (params) => {
    let param = {};
    if (params.userNames) {
        param.userNames = JSON.stringify(params.userNames);
    } else {
        MessageBox('【userNames】参数不能为空');
    }
    return axios.post('/webAdmin/deleteUserAccountByUserName', qs.stringify(param)).then(res => res.data);
};
/**
 * 更新用户状态,用户审批通过，禁用
 * @param {*} params
 */
// /webAdmin/updateZhztByUuid
export const updateZhztByUserName = (params) => {
    let param = {};
    if (params.status) {
        param.status = params.status;
    } else {
        MessageBox('【status】参数不能为空');
    }
    if (params.userNames) {
        param.userNames = JSON.stringify(params.userNames);
    } else {
        MessageBox('【userNames】参数不能为空');
    }
    return axios.post('webAdmin/updateZhztByUserName', qs.stringify(param)).then(res => res.data);
};

/**
 * 通用删除接口
 * @param {tableId表ID名,uuids:删除} params
 */
export const webCommonDelByIds = (params) => {
    let param = {};
    if (!params.tableId) {
        MessageBox('【tableId】参数不能为空');
    } else {
        param.tableId = params.tableId;
    }
    if (!params.uuids) {
        MessageBox('【uuids】参数不能为空');
    } else {
        param.uuids = JSON.stringify(params.uuids);
    }
    return axios.post('web/webCommonDelByIds', qs.stringify(param)).then(res => res.data);
};
/**
 * 批量更新
 * @param {tableId:表名ID,uuids:更新uuids数组,setMap:更新的值} params
 */
// /web/webUpdateBatch
export const webUpdateBatch = (params) => {
    let param = {};
    if (!params.tableId) {
        MessageBox('【tableId】参数不能为空');
    } else {
        param.tableId = params.tableId;
    }
    if (!params.uuids) {
        MessageBox('【uuids】参数不能为空');
    } else {
        param.uuids = JSON.stringify(params.uuids);
    }
    if (!params.setMap) {
        MessageBox('【setMap】参数不能为空');
    } else {
        param.setMap = JSON.stringify(params.setMap);
    }
    return axios.post('webAdmin/webUpdateBatch', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取栏目权限信息
 * @param {*} params
 */
export const getWebLmqx = (params) => {
    let param = {};
    if (!params.lmid) {
        MessageBox('【lmid】参数不能为空');
    } else {
        param.lmid = params.lmid;
    }
    return axios.post('webAdmin/getTitlePermission', qs.stringify(param)).then(res => res.data);
};
/**
 * 验证票据是否失效
 * @param {*} params
 */
export const tokenWhetherPast = () => {
    return axios.post('/webAdmin/tokenWhetherPast').then(res => res.data);
};

/**
 * 获取本用户下的列表信息
 * @param {ownerColname:存储用户信息字段的中文名，tableid：表名ID} params
 */
// /webAdmin/webGetMySimpleGridList
export const webGetMySimpleGridList = (params) => {
    let param = {};
    // ownerColname
    if (!params.ownerColname) {
        MessageBox('【ownerColname】参数不能为空');
        return;
    } else {
        param.ownerColname = params.ownerColname;
    }
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
    return axios.post('/webAdmin/webGetMySimpleGridList', qs.stringify(param)).then(res => res.data);
};
/**
 * 
 * @param {oldPwd:老密码,newPwd:新密码,repeatPwd:重复密码} params
 */
// /oApp/modifyPwd 密码修改
export const modifyPwd = (params) => {
    let param = {};
    // ownerColname
    if (!params.oldPwd) {
        MessageBox('【oldPwd】参数不能为空');
        return;
    } else {
        param.oldPwd = md5(params.oldPwd);
    }
    if (!params.newPwd) {
        MessageBox('【newPwd】参数不能为空');
        return;
    } else {
        param.newPwd = md5(params.newPwd);
    }
    if (!params.repeatPwd) {
        MessageBox('【repeatPwd】参数不能为空');
        return;
    } else {
        param.repeatPwd = md5(params.repeatPwd);
    }
    return axios.post('/oApp/modifyPwd', qs.stringify(param)).then(res => res.data);
};
/**
 * 检查是否已收藏
 * @param {tableId：收藏表中的bm,uuid:收藏表中的zj} params
 */
// POST /webAdmin/checkMyFavorites
export const checkMyFavorites = (params) => {
    let param = {};
    // ownerColname
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
    return axios.post('/webAdmin/checkMyFavorites', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取我的收藏列表
 * @param {*} params
 */
// POST /webAdmin/getMyFavorites
export const getMyFavorites = (params) => {
    let param = {};
    // ownerColname
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
    return axios.post('/webAdmin/getMyFavorites', qs.stringify(param)).then(res => res.data);
};
/**
 * 个人中心退出
 * @param {*} params
 */
export const logOut = (params) => {
    let param = {};
    if (!params.userName) {
        MessageBox('【getMyFavorites-userName】参数不能为空');
    } else {
        param.userName = params.userName;
    }
    return axios.post('/oApp/logout', qs.stringify(param)).then(res => res.data);
};
// POST /webAdmin/webSaveMyForm
/**
 * 
 * @param {tableId：表id,ownerColname:存用户名的中文字段} params
 */
export const webSaveMyForm = (params) => {
    let param = {};
    if (!params.tableId) {
        MessageBox('【tableId】参数不能为空');
    } else {
        param.tableId = params.tableId;
    }
    if (!params.ownerColname) {
        MessageBox('【ownerColname】参数不能为空');
    } else {
        param.ownerColname = params.ownerColname;
    }
    param.param = JSON.stringify(params.params);
    return axios.post('/webAdmin/webSaveMyForm', qs.stringify(param)).then(res => res.data);
};
// POST /webAdmin/webApplyMatter
/**
 * 
 * @param {matterUuid：事项的UUID,param}
 */
export const webApplyMatter = (params) => {
    let param = {};
    if (params.matterUuid) {
        param.matterUuid = params.matterUuid;
    }
    param.param = JSON.stringify(params.params);
    return axios.post('/webAdmin/webApplyMatter', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取事项详细信息及流程信息
 * @param {*} params
 */
export const getSxInfo = (params) => {
    let param = {};
    if (params.uuid) {
        param.uuid = (params.uuid);
    }
    return axios.post('/webAdmin/getSxInfo', qs.stringify(param)).then(res => res.data);
};
/**
 * 获取用户详细信息接口
 */
// /webAdmin/getUserAndCompanyManagerInfo
export const getUserAndCompanyManagerInfo = () => {
    return axios.post('/webAdmin/getUserAndCompanyManagerInfo').then(res => res.data);
};

export const getMyPjList = (params) => {
    let param = {};
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
    return axios.post('/webAdmin/getMyPjList', qs.stringify(param)).then(res => res.data);
};
/**
 * 办件是否已经被评价
 * @param {bjuuid} params 
 */
// POST /webAdmin/checkWhetherAppraise
export const checkWhetherAppraise = (params) => {
    let param = {};
    if (!params.bjuuid) {
        MessageBox('【bjuuid】参数不能为空');
    } else {
        param.bjuuid = params.bjuuid;
    }
    param.param = JSON.stringify(params.params);
    return axios.post('/webAdmin/checkWhetherAppraise', qs.stringify(param)).then(res => res.data);
};
// /webAdmin/webDelFile
// /web/webDelFile 放置在admin下，必须登录后才能进行删除
export const webDelFile = (params) => {
    let param = {};
    if (!params.tableId) {
          MessageBox('【tableId】参数不能为空');
          return;
    } else {
          param.tableId = params.tableId;
    }
    if (!params.fileId) {
          MessageBox('【fileId】参数不能为空');
          return;
    } else {
          param.fileId = params.fileId;
    }
    return axios.post('/webAdmin/webDelFile', qs.stringify(param)).then(res => res.data);
};
//
//我的办件带快递单号，必须登录
export const getMatterLogisticsInfoList = (params) => {
    let param = {};
    // ownerColname
    if (!params.ownerColname) {
        MessageBox('【ownerColname】参数不能为空');
        return;
    } else {
        param.ownerColname = params.ownerColname;
    }
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
    return axios.post('/webAdmin/getMatterLogisticsInfoList', qs.stringify(param)).then(res => res.data);
};