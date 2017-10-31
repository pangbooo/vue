/**
 * 获取栏目的访问控制
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var getNewUUID;

if (staticApi.staticApi) {
      getNewUUID = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'getFwkz';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = '["' + params.uuid + '"]';
            params['keys'] = '[]';
            return axios.post('/control/getList.view', qs.stringify(params)).then(res => res.data);
      };
} else {
    getNewUUID = (params) => {
        return axios.post('/getNewUUID.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default getNewUUID;
