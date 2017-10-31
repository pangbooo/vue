/**
 * 获取用户信息列表-----搜索框
 */
import axios from '../../config/axios/axios';
import qs from 'qs';
import staticApi from '../../config/axios/env.js';

var getQyglSearch;

if (staticApi.staticApi) {
      getQyglSearch = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'getQyglSearch';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = '["%' + params.args + '%","%' + params.args + '%","%' + params.args + '%","%' + params.zt + '%"]';
            params['keys'] = '[]';
            params['pageSize'] = 10;
            // console.log(params['args']);
            return axios.post('/control/getGrid.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      getQyglSearch = (params) => {
            return axios.post('/getYhglGrid.view', qs.stringify(params)).then(res => res.data);
      };
}
export default getQyglSearch;
