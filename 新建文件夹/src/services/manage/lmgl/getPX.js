/**
 * 获取栏目管理列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { dbgetList } from '@/api/common.js';

var getPX;

if (staticApi.staticApi) {
    getPX = (params) => {
        if (!params) {
            params = {};
        }
        // console.log(params);
        let param = {};
        param['script'] = 'getCatalogByUUID';
        param['replaceMap'] = { 'developer': 'hlwj' };
        // param['replaceMap'] = JSON.stringify(params['replaceMap']);
        param['args'] = [params.puuid];
        // param['keys'] = '[]';
        // console.log(params['args']);
        // console.log(param);
        return dbgetList(param);
        // return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    getPX = (params) => {
        return axios.post('/getPX.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default getPX;
