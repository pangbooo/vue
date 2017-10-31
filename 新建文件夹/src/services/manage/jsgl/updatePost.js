import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { updatePostNameInfo } from '@/api/manage.js';
var updatePost;
if (staticApi.staticApi) {
    updatePost = (params) => {
        return updatePostNameInfo(params);
    };
} else {
    updatePost = (params) => {
        return axios.post('/updatePostName.view', qs.stringify(params)).then(res2 => res2.data).catch(res3 => res3.data);
    };
}
export default updatePost;
