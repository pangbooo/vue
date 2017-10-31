import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var getContent;

if (staticApi.staticApi) {
    getContent = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    getContent = (params) => {
        return axios.post('/getContent.view', qs.stringify(params)).then(res => res.data);
    };
}
export default getContent;
