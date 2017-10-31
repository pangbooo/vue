/**
 * 批量执行删除我要咨询
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
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['script'] = [];
            params['keys'] = [];
            for (let a = 0; a < params['args'].length; a++) {
                  params['script'].push('deleteWyzx');
                  params['keys'].push([]);
            }
            // console.log(params['keys']);
            // console.log(params['script']);
            params['script'] = JSON.stringify(params['script']);
            params['args'] = JSON.stringify(params['args']);
            params['keys'] = JSON.stringify(params['keys']);
            return axios.post('/control/batchExecute.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      deleteWyzx = (params) => {
            return axios.post('/deleteWyzx.view', qs.stringify(params)).then(res => res.data);
      };
}
export default deleteWyzx;
