import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getDeptPersonTreeList } from '@/api/manage.js';
var getDeptPersonTree;
if (staticApi.staticApi) {
    getDeptPersonTree = (params) => {
        return getDeptPersonTreeList(params);
    };
} else {
    getDeptPersonTree = (params) => {
        return axios.post('/getDeptPersonTree.view', qs.stringify(params)).then(res2 => res2.data).catch(res3 => res3.data);
    };
}
export default getDeptPersonTree;
