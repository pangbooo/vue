/**
 * 删除用户信息
 */
import axios from '../../config/axios/axios';
import qs from 'qs';
import staticApi from '../../config/axios/env.js';

var deleteQygl;

if (staticApi.staticApi) {
      deleteQygl = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'deleteQYYhgl';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = JSON.stringify(params['args']);
            params['keys'] = '[]';
            return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      deleteQygl = (params) => {
            return axios.post('/getYhglGrid.view', qs.stringify(params)).then(res => res.data);
      };
}
export default deleteQygl;
