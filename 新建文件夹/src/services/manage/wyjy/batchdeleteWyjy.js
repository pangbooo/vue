/**
 * 批量执行删除我要咨询
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var deleteWyjy;

if (staticApi.staticApi) {
      deleteWyjy = (params) => {
            if (!params) {
                  params = {};
            }
            let length = params['args'].length;
            let scriptArr = [];
            let keysArr = [];
            for (let i = 0; i < length; i++) {
                  scriptArr.push('deleteWyjy');
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
      deleteWyjy = (params) => {
            return axios.post('/deleteWyjy.view', qs.stringify(params)).then(res => res.data);
      };
}
export default deleteWyjy;
