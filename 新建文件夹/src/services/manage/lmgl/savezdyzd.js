/**
 * 获取栏目的访问控制
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var savezdyzd;

if (staticApi.staticApi) {
      savezdyzd = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'getFwkz';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = '["' + params.uuid + '"]';
            params['keys'] = '[]';
            return axios.post('/control/getList.view', qs.stringify(params)).then(res => res.data);
      };
} else {
    savezdyzd = (params) => {
        return axios.post('/savezdyzd.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default savezdyzd;
