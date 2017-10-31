/**
 * 修改用户状态
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { updateZhztByUserName } from '@/api/manage.js';
var updateYhglZT;

if (staticApi.staticApi) {
      updateYhglZT = (params) => {
            // if (!params) {
            //       params = {};
            // }
            // params['script'] = 'updateYhZTByUUID';
            // params['replaceMap'] = { 'developer': 'hlwj' };
            // params['replaceMap'] = JSON.stringify(params['replaceMap']);
            // params['args'] = JSON.stringify(params['args']);
            // params['keys'] = '[]';
            // return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data).catch(error => error);
            return updateZhztByUserName(params);
      };
} else {
      updateYhglZT = (params) => {
            return axios.post('/getYhglGrid.view', qs.stringify(params)).then(res => res.data);
      };
}
export default updateYhglZT;
