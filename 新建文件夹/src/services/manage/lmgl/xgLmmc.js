/**
 * 获取栏目管理列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { dbexecute } from '@/api/common.js';

var xgLmmc;

if (staticApi.staticApi) {
    xgLmmc = (params) => {
        if (!params) {
            params = {};
        }
        // console.log(params);
        let param = {};
        param['script'] = 'updateCatalogByUUID';
        param['replaceMap'] = { 'developer': 'hlwj' };
        // param['replaceMap'] = JSON.stringify(params['replaceMap']);
        param['args'] = [params.lmmc, params.lmdm, params.uuid];
        // param['keys'] = '[]';
        // console.log(params['args']);
        // console.log(param);
        return dbexecute(param);
        // return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    xgLmmc = (params) => {
        return axios.post('/xgLmmc.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default xgLmmc;
