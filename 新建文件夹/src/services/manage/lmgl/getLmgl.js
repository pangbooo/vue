/**
 * 获取栏目管理列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { dbgetGrid } from '@/api/common.js';
var getLmgl;

if (staticApi.staticApi) {
    getLmgl = (params) => {
        let param = {};
        param['script'] = 'getCatalogByUUID';
        param['replaceMap'] = { developer: 'hlwj' };
        param['args'] = [params.puuid];
        param['nowPage'] = params.nowPage;
        param['pageSize'] = params.pageSize;
        return dbgetGrid(param);
    };
} else {
    getLmgl = (params) => {
        return axios.post('/getLmgl.view', qs.stringify(params)).then(res => {
            let newData = res.data;
            let temp = [];
            for (let i = 0; i < res.data.result.DataList.length; i++) {
                if (res.data.result.DataList[i].PUUID === params.puuid) {
                    temp.push(res.data.result.DataList[i]);
                } else { }
            }
            newData.result.DataList = temp;
            newData.result.totalRows = newData.result.DataList.length;
            newData.result.DataList = newData.result.DataList.slice(params.pageSize * (params.nowPage - 1), params.pageSize * params.nowPage);
            return newData;
        });
    };
}
export default getLmgl;
