import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var wzqditems;

if (staticApi.staticApi) {
    wzqditems = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    wzqditems = (params) => {
        return axios.post('/wzqditems.view', qs.stringify(params)).then(res => res.data);
    };
}
export default wzqditems;
