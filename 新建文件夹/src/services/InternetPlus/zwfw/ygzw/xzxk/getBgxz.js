import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var getBgxz;

if (staticApi.staticApi) {
    getBgxz = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    getBgxz = (params) => {
        return axios.post('/getBgxz.view', qs.stringify(params)).then(res => res.data);
    };
}
export default getBgxz;
