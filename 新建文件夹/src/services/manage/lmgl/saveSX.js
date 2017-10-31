/**
 * 保存属性
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { saveFormService } from '@/api/common.js';
var saveipkz;

if (staticApi.staticApi) {
    saveipkz = (params) => {
        let param = {};
        let tableId = '47c2c4885d778155015d81c97b310016';
        param.tableId = tableId;
        // param['script'] = 'updateCatalogByUUID';
        // param['replaceMap'] = { developer: 'hlwj' };
        // param['args'] = [params.LMMC, params.LMDM, params.uuid];
        param.params = { 导航显示: params.DHXS, 栏目描述: params.LMMS, 栏目图标: params.LMTB, 关键字: params.GJZ, IP控制: params.IPKZ, 角色: params.JS, 角色权限: params.JSQX, 栏目代码: params.LMDM, 栏目类型: params.LMLX, 父主键: params.puuid, 全文检索页: params.QWJSY, 所属部门: params.SSBM, 文章扩展字段: params.WZKZZD, 文章内容页: params.WZNRY, 栏目名称: params.LMMC, 应用模板: params.YYMB, 主模版: params.ZMB, 状态: params.ZT, 组图内容页: params.ZTNRY, UUID: params.uuid };
        return saveFormService(param);
    };
} else {
    saveipkz = (params) => {
        return axios.post('/saveipkz.view', qs.stringify(params)).then(res => {
            // console.log(params);
            return res.data;
        });
    };
}
export default saveipkz;
