/**
 * 修改用户状态
 */
import axios from '../../config/axios/axios';
import qs from 'qs';
import staticApi from '../../config/axios/env.js';

var updateQYYhglZT;

if (staticApi.staticApi) {
      updateQYYhglZT = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'updateQYYhZTByUUID';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = JSON.stringify(params['args']);
            params['keys'] = '[]';
            return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      updateQYYhglZT = (params) => {
            return axios.post('/getYhglGrid.view', qs.stringify(params)).then(res => res.data);
      };
}
export default updateQYYhglZT;
