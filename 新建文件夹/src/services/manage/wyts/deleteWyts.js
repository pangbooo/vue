/**
 * 删除我要咨询
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var deleteWyts;

if (staticApi.staticApi) {
      deleteWyts = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'deleteWyts';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = JSON.stringify(params['args']);
            params['keys'] = '[]';
            return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      deleteWyts = (params) => {
            return axios.post('/deleteWyts.view', qs.stringify(params)).then(res => res.data);
      };
}
export default deleteWyts;
