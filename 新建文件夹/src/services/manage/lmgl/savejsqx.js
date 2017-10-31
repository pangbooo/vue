/**
 * 保存角色权限
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var savejsqx;

if (staticApi.staticApi) {
    savejsqx = (params) => {
        if (!params) {
            params = {};
        }
        params['script'] = 'xglmmc';
        params['replaceMap'] = { 'developer': 'hlwj' };
        params['replaceMap'] = JSON.stringify(params['replaceMap']);
        params['args'] = '["' + params.lmmc + '","' + params.lmdm + '","' + params.uuid + '"]';
        params['keys'] = '[]';
        // console.log(params['args']);
        return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    savejsqx = (params) => {
        return axios.post('/savejsqx.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default savejsqx;
