import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var getQllct;

if (staticApi.staticApi) {
    getQllct = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    getQllct = (params) => {
        return axios.post('/getQllct.view', qs.stringify(params)).then(res => res.data);
    };
}
export default getQllct;
