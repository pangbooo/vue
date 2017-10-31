/**
 * 删除用户信息
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { deleteUserAccountByUserName } from '@/api/manage.js';
var deleteYhgl;

if (staticApi.staticApi) {
      deleteYhgl = (params) => {
            // if (!params) {
            //       params = {};
            // }
            // params['script'] = 'deleteYhgl';
            // params['replaceMap'] = { 'developer': 'hlwj' };
            // params['replaceMap'] = JSON.stringify(params['replaceMap']);
            // params['args'] = JSON.stringify(params['args']);
            // params['keys'] = '[]';
            // return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
            return deleteUserAccountByUserName(params);
      };
} else {
      deleteYhgl = (params) => {
            return axios.post('/getYhglGrid.view', qs.stringify(params)).then(res => res.data);
      };
}
export default deleteYhgl;
