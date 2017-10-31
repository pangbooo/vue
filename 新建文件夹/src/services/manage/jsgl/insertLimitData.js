import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { insertLimitInfo } from '@/api/manage.js';
var insertLimitData;
if (staticApi.staticApi) {
    insertLimitData = (params) => {
        return insertLimitInfo(params);
    };
} else {
    insertLimitData = (params) => {
        return axios.post('/insertLimitData.view', qs.stringify(params)).then(res2 => res2.data).catch(res3 => res3.data);
    };
}
export default insertLimitData;
