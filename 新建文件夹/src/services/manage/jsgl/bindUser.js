import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { addUserToPost } from '@/api/manage.js';
var bindUser;
if (staticApi.staticApi) {
    bindUser = (params) => {
        return addUserToPost(params);
    };
} else {
    bindUser = (params) => {
        return axios.post('/bindUser.view', qs.stringify(params)).then(res2 => res2.data).catch(res3 => res3.data);
    };
}
export default bindUser;
