import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var getJbxx;

if (staticApi.staticApi) {
    getJbxx = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    getJbxx = (params) => {
        return axios.post('/getJbxx.view', qs.stringify(params)).then(res => res.data);
    };
}
export default getJbxx;
