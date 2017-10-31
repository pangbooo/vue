/**
 * 删除我要咨询
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var deleteWyzx;

if (staticApi.staticApi) {
      deleteWyzx = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'deleteWyzx';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = JSON.stringify(params['args']);
            params['keys'] = '[]';
            return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      deleteWyzx = (params) => {
            return axios.post('/deleteWyzx.view', qs.stringify(params)).then(res => res.data);
      };
}
export default deleteWyzx;
