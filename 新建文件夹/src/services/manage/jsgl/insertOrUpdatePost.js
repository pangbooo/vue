import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { insertOrUpdatePostNameInfo } from '@/api/manage.js';
var insertOrUpdatePost;
if (staticApi.staticApi) {
    insertOrUpdatePost = (params) => {
        return insertOrUpdatePostNameInfo(params);
    };
} else {
    insertOrUpdatePost = (params) => {
        return axios.post('/insertOrUpdatePost.view', qs.stringify(params)).then(res2 => res2.data).catch(res3 => res3.data);
    };
}
export default insertOrUpdatePost;
