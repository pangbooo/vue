import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var zrqdlbr;

if (staticApi.staticApi) {
    zrqdlbr = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    zrqdlbr = (params) => {
        return axios.post('/getZrqdlbr.view', qs.stringify(params)).then(res => res.data);
    };
}
export default zrqdlbr;
