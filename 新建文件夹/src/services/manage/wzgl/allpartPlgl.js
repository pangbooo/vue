/**
 * 获取栏目管理列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import {getAllArticleCommentsList} from '@/api/manage.js';
var getPlgl;

if (staticApi.staticApi) {
    //   getPlgl = (params) => {
    //         if (!params) {
    //               params = {};
    //         }
    //         params['script'] = 'getPlgl';
    //         params['replaceMap'] = { 'developer': 'hlwj' };
    //         params['replaceMap'] = JSON.stringify(params['replaceMap']);
    //         params['args'] = '["' + params.puuid + '"]';
    //         params['keys'] = '[]';
    //         params['pageSize'] = params.pageSize;
    //         params['nowPage'] = params.nowPage;
    //         return axios.post('/control/getGrid.view', qs.stringify(params)).then(res => res.data);
    //   };
    getPlgl = (params) => {
        return getAllArticleCommentsList(params);
    };
} else {
    getPlgl = (params) => {
        return axios.post('/getPlgl2.view', qs.stringify(params)).then(res => {
            return res.data;
        });
    };
}
export default getPlgl;
