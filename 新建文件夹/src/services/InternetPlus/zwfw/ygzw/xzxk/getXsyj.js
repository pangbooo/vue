import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var getXsyj;

if (staticApi.staticApi) {
    getXsyj = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    getXsyj = (params) => {
        return axios.post('/getXsyj.view', qs.stringify(params)).then(res => res.data);
    };
}
export default getXsyj;
