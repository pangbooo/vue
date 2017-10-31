import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var szfbgs;

if (staticApi.staticApi) {
    szfbgs = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    szfbgs = (params) => {
        return axios.post('/szfbgs.view', qs.stringify(params)).then(res => res.data);
    };
}
export default szfbgs;
