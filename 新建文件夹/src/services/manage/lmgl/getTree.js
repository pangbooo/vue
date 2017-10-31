/**
 * 获取栏目树
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
// import { dbgetList } from '@/api/common.js';
import { webGetLmTreeByRole } from '@/api/manage.js';
var getTree;

if (staticApi.staticApi) {
    // getTree = (params) => {
    //     if (!params) {
    //         params = {};
    //     }
    //     // params.script = 'getAllCatalogTree';
    //     params['script'] = 'getAllCatalogTree';
    //     params['replaceMap'] = { developer: 'hlwj' };
    //     return dbgetList(params);
    // };
    getTree = (params) => {
        return webGetLmTreeByRole(params);
    };
} else {
    getTree = (params) => {
        return axios.post('/getTree.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default getTree;
