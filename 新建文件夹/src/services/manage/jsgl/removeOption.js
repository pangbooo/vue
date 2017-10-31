/**
 * 移除选中操作
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var removeOption;

if (staticApi.staticApi) {
      removeOption = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'removeOption';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = JSON.stringify(params['args']);
            params['keys'] = '[]';
            return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      removeOption = (params) => {
            return axios.post('/removeOption.view', qs.stringify(params)).then(res => res.data);
      };
}
export default removeOption;
