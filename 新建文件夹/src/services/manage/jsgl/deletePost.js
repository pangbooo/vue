import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { deletePostNameInfo } from '@/api/manage.js';
var deletePost;
if (staticApi.staticApi) {
    deletePost = (params) => {
        let param = {};
        param.xh = params.xh.toString();
        return deletePostNameInfo(param);
    };
} else {
    deletePost = (params) => {
        return axios.post('/deletePostName.view', qs.stringify(params)).then(res2 => res2.data).catch(res3 => res3.data);
    };
}
export default deletePost;
