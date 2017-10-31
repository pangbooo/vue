/**
 * 删除我要咨询
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var deleteWyjy;

if (staticApi.staticApi) {
      deleteWyjy = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'deleteWyjy';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = JSON.stringify(params['args']);
            params['keys'] = '[]';
            return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      deleteWyjy = (params) => {
            return axios.post('/deleteWyjy.view', qs.stringify(params)).then(res => res.data);
      };
}
export default deleteWyjy;
