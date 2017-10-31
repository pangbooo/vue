/**
 * 获取栏目文章列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
// import {dbgetGrid} from '@/api/common.js';
import {webGetWzListByRole} from '@/api/manage.js';
var getWzlb;

if (staticApi.staticApi) {
      getWzlb = (params) => {
            // if (!params) {
            //       params = {};
            // }
            // let param = {};
            // param['script'] = 'getWZLB';
            // param['replaceMap'] = { 'developer': 'hlwj' };
            // param['args'] = [params.puuid];
            // param['keys'] = '[]';
            // param['pageSize'] = params.pageSize;
            // param['nowPage'] = params.nowPage;
            // return dbgetGrid(param);
            return webGetWzListByRole(params);
      };
} else {
    getWzlb = (params) => {
        return axios.post('/getNrwh.view', qs.stringify(params)).then(res => {
            let newData = res.data;
            newData.result.totalRows = newData.result.DataList.length;
            newData.result.DataList = newData.result.DataList.slice(params.pageSize * (params.nowPage - 1), params.pageSize * params.nowPage);
            return newData;
        });
    };
}
export default getWzlb;
