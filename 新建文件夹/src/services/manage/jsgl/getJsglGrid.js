import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getPostList } from '@/api/manage.js';
var getJsglGrid;
if (staticApi.staticApi) {
    getJsglGrid = (params) => {
        return getPostList(params);
    };
} else {
    getJsglGrid = (params) => {
        return axios.post('/getJsglGrid.view', qs.stringify(params)).then(res2 => res2.data).catch(res3 => res3.data);
    };
}
export default getJsglGrid;
