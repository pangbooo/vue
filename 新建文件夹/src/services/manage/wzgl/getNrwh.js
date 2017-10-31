/**
 * 获取栏目管理列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetWZGrid } from '@/api/common.js';

var getNrwh;

if (staticApi.staticApi) {
    getNrwh = (params) => {
        if (!params) {
                params = {};
        }
        let param = {};
        param.LMID = params.puuid;
        param.nowPage = params.nowPage;
        param.pageSize = params.pageSize;
        return webGetWZGrid(param);
    };
} else {
    getNrwh = (params) => {
        return axios.post('/getNrwh.view', qs.stringify(params)).then(res => {
            let newData = res.data;
            newData.result.totalRows = newData.result.DataList.length;
            newData.result.DataList = newData.result.DataList.slice(params.pageSize * (params.nowPage - 1), params.pageSize * params.nowPage);
            return newData;
        });
    };
}
export default getNrwh;
