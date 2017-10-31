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
            let length = params['args'].length;
            let scriptArr = [];
            let keysArr = [];
            for (let i = 0; i < length; i++) {
                  scriptArr.push('deleteQYYhgl');
                  keysArr.push([]);
            }
            params['script'] = scriptArr;
            params['script'] = JSON.stringify(params['script']);
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = JSON.stringify(params['args']);
            params['keys'] = keysArr;
            params['keys'] = JSON.stringify(params['keys']);
            return axios.post('/control/batchExecute.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      deleteQygl = (params) => {
            return axios.post('/getYhglGrid.view', qs.stringify(params)).then(res => res.data);
      };
}
export default deleteQygl;
