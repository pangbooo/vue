/**
 * 快速创建栏目管理
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var kscjLmgl;

if (staticApi.staticApi) {
    kscjLmgl = (params) => {
        if (!params) {
            params = {};
        }
        params['replaceMap'] = { 'developer': 'hlwj' };
        params['replaceMap'] = JSON.stringify(params['replaceMap']);
        params['script'] = [];
        params['keys'] = [];
        // console.log(params.length);
        for (let a = 0; a < params['args'].length; a++) {
                params['script'].push('ksxjjblm');
                params['keys'].push([]);
        }
        params['script'] = JSON.stringify(params['script']);
        params['args'] = JSON.stringify(params['args']);
        params['keys'] = JSON.stringify(params['keys']);
        return axios.post('/control/batchExecute.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    kscjLmgl = (params) => {
        return axios.post('/kscjLmgl.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default kscjLmgl;
