/**
 * 获取栏目管理列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var backGdwz;

if (staticApi.staticApi) {
      backGdwz = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'backGdwz';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = '["' + params.puuid + '"]';
            params['keys'] = '[]';
            params['pageSize'] = params.pageSize;
            params['nowPage'] = params.nowPage;
            return axios.post('/control/getGrid.view', qs.stringify(params)).then(res => res.data);
      };
} else {
    backGdwz = (params) => {
        return axios.post('/getStatus.view', qs.stringify(params)).then(res => res.data);
    };
}
export default backGdwz;
