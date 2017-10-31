import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var szfgzbm;

if (staticApi.staticApi) {
    szfgzbm = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    szfgzbm = (params) => {
        return axios.post('/szfgzbm.view', qs.stringify(params)).then(res => res.data);
    };
}
export default szfgzbm;
