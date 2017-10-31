import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var getSqcl;

if (staticApi.staticApi) {
    getSqcl = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    getSqcl = (params) => {
        return axios.post('/getSqcl.view', qs.stringify(params)).then(res => res.data);
    };
}
export default getSqcl;
