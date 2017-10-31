/**
 * 登记栏目管理
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { saveFormService } from '@/api/common.js';
var djLmgl;

if (staticApi.staticApi) {
    djLmgl = (params) => {
        // let param = {};
        // param['script'] = 'addCatalog';
        // param['replaceMap'] = { developer: 'hlwj' };
        // param['args'] = [params.xsmc, params.lmdm, params.gjz, params.lmlx, params.zmb, params.zt, params.wzkzzd, params.wznry, params.ztnry, params.qwjsy, params.ssbm, params.jsqx, params.js, params.ipkz, params.puuid];
        // return dbexecute(param);
        let param = {};
        let tableId = '47c2c4885d778155015d81c97b310016';
        param.tableId = tableId;
        // param['script'] = 'updateCatalogByUUID';
        // param['replaceMap'] = { developer: 'hlwj' };
        // param['args'] = [params.LMMC, params.LMDM, params.uuid];
        param.params = { 导航显示: params.DHXS, 栏目描述: params.LMMS, 栏目图标: params.LMTB, 关键字: params.gjz, IP控制: params.ipkz, 角色: params.js, 角色权限: params.jsqx, 栏目代码: params.lmdm, 栏目类型: params.lmlx, 父主键: params.puuid, 全文检索页: params.qwjsy, 所属部门: params.ssbm, 文章扩展字段: params.wzkzzd, 文章内容页: params.wznry, 栏目名称: params.xsmc, 应用模板: params.yymb, 主模版: params.zmb, 状态: params.zt, 组图内容页: params.ztnry };
        // param.params = { 导航显示: params.DHXS, 栏目描述: params.LMMS, 栏目名称: '1' };
        return saveFormService(param);
    };
} else {
    djLmgl = (params) => {
        return axios.post('/djLmgl.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default djLmgl;
