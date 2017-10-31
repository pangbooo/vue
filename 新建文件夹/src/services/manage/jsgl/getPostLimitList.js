import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getPostNameLimitList } from '@/api/manage.js';
var getPostLimitList;
if (staticApi.staticApi) {
    getPostLimitList = (params) => {
        return getPostNameLimitList(params);
    };
} else {
    getPostLimitList = (params) => {
        return axios.post('/getPostNameLimitList.view', qs.stringify(params)).then(res2 => res2.data).catch(res3 => res3.data);
    };
}
export default getPostLimitList;
