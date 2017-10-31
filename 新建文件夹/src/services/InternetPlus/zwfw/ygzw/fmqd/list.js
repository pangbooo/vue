import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var zszdw;

if (staticApi.staticApi) {
    zszdw = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    zszdw = (params) => {
        return axios.post('/getFmqdList.view', qs.stringify(params)).then(res => res.data);
    };
}
export default zszdw;
