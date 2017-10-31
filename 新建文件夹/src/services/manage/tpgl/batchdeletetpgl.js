/**
 * 删除用户信息
 */
import axios from '../../config/axios/axios';
import qs from 'qs';
import staticApi from '../../config/axios/env.js';

var batchdeletetpgl;

if (staticApi.staticApi) {
      batchdeletetpgl = (params) => {
            if (!params) {
                  params = {};
            }
            let length = params['args'].length;
            let scriptArr = [];
            let keysArr = [];
            for (let i = 0; i < length; i++) {
                  scriptArr.push('deleteYhgl');
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
      batchdeletetpgl = (params) => {
            return axios.post('/getTpgl.view', qs.stringify(params)).then(res => res.data);
      };
}
export default batchdeletetpgl;
