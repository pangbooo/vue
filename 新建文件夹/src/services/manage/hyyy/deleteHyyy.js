/**
 * 删除我要咨询
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var deleteHyyy;

if (staticApi.staticApi) {
      deleteHyyy = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'deleteHyyy';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = JSON.stringify(params['args']);
            params['keys'] = '[]';
            return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      deleteHyyy = (params) => {
            return axios.post('/deleteHyyy.view', qs.stringify(params)).then(res => res.data);
      };
}
export default deleteHyyy;
