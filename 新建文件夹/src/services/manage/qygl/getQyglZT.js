/**
 * 获取企业信息列表---检索条件：状态
 */
import axios from '../../config/axios/axios';
import qs from 'qs';
import staticApi from '../../config/axios/env.js';

var getQyglZT;

if (staticApi.staticApi) {
      getQyglZT = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'getQYglGridZT';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = '["%' + params.args + '%"]';
            params['keys'] = '[]';
            params['pageSize'] = 10;

            return axios.post('/control/getGrid.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      getQyglZT = (params) => {
            return axios.post('/getQYglGrid.view', qs.stringify(params)).then(res => res.data);
      };
}
export default getQyglZT;
