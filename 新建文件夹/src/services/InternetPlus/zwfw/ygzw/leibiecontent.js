import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var leibiecontent;

if (staticApi.staticApi) {
    leibiecontent = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    leibiecontent = (params) => {
        return axios.post('/leibiecontent.view', qs.stringify(params)).then(res => res.data);
    };
}
export default leibiecontent;
