/**
 * 批量执行删除婚姻预约
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var batchdeleteHyyy;

if (staticApi.staticApi) {
      batchdeleteHyyy = (params) => {
            if (!params) {
                  params = {};
            }
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['script'] = [];
            params['keys'] = [];
            for (let a = 0; a < params['args'].length; a++) {
                  params['script'].push('deleteHyyy');
                  params['keys'].push([]);
            }
            params['script'] = JSON.stringify(params['script']);
            params['args'] = JSON.stringify(params['args']);
            params['keys'] = JSON.stringify(params['keys']);
            return axios.post('/control/batchExecute.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      batchdeleteHyyy = (params) => {
            return axios.post('/batchdeleteHyyy.view', qs.stringify(params)).then(res => res.data);
      };
}
export default batchdeleteHyyy;
