/**
 * 获取栏目管理列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var pastelm;

if (staticApi.staticApi) {
    // 这里要判断是复制还是剪切
    pastelm = (params) => {
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
    pastelm = (params) => {
        return axios.post('/pastelm.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default pastelm;
