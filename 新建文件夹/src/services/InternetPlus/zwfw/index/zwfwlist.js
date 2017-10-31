import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetWZGrid } from '@/api/common.js';

var getZWFWList;

if (staticApi.staticApi) {
    getZWFWList = (params) => {
        let param = {};
        param.LMID = params.puuid;
        param.nowPage = params.nowpage;
        param.pageSize = params.pagesize;
        param.zyxOrDjl = params.zyxOrDjl;
        return webGetWZGrid(param);
    };
} else {
    getZWFWList = (params) => {
        return axios.post('/getZWFWList.view', qs.stringify(params)).then(res => res.data);
    };
}
export default getZWFWList;
