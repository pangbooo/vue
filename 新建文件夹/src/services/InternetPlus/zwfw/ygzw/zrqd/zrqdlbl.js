import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var zrqdlbl;

if (staticApi.staticApi) {
    zrqdlbl = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    zrqdlbl = (params) => {
        return axios.post('/getZrqdlbl.view', qs.stringify(params)).then(res => res.data);
    };
}
export default zrqdlbl;
