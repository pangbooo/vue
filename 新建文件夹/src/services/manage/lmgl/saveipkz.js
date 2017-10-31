/**
 * 保存ip控制
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var saveipkz;

if (staticApi.staticApi) {
    saveipkz = (params) => {
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
    saveipkz = (params) => {
        return axios.post('/saveipkz.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default saveipkz;
