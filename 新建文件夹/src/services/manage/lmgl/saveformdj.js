/**
 * 保存自定义字段--增加字段
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { saveFormService } from '@/api/common.js';
var saveformdj;

if (staticApi.staticApi) {
    saveformdj = (params) => {
        let param = {};
        let tableId = '47c2c4885e07b711015e2753479b0126';
        param.tableId = tableId;
        // param['script'] = 'updateCatalogByUUID';
        // param['replaceMap'] = { developer: 'hlwj' };
        // param['args'] = [params.LMMC, params.LMDM, params.uuid];
        param.params = { 字段名称: params.XSM, 字段类型: params.LX, 默认值: params.MRZ, 排序: params.XSSX, 预留字段: params.YLZD, 栏目编号: params.PUUID, 是否为检索项: params.SFWJSX };
        return saveFormService(param);
    };
} else {
    saveformdj = (params) => {
        return axios.post('/saveformdj.view', qs.stringify(params)).then(res => {
            // console.log(params);
            return res.data;
        });
    };
}
export default saveformdj;
