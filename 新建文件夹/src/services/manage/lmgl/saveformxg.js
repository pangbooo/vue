/**
 * 保存自定义字段--增加字段
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { saveFormService } from '@/api/common.js';
var saveformxg;

if (staticApi.staticApi) {
    saveformxg = (params) => {
        let param = {};
        let tableId = '47c2c4885e07b711015e2753479b0126';
        param.tableId = tableId;
        param.params = { 字段名称: params.ZDMC, 字段类型: params.ZDLX, 默认值: params.MRZ, 预留字段: params.YLZD, 是否为检索项: params.SFWJSX, UUID: params.UUID };
        return saveFormService(param);
    };
} else {
    saveformxg = (params) => {
        return axios.post('/saveformxg.view', qs.stringify(params)).then(res => {
            // console.log(params);
            return res.data;
        });
    };
}
export default saveformxg;
