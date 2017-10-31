import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var getSmxsData;

if (staticApi.staticApi) {
    getSmxsData = (params) => {
        params['script'] = 'getSmxsData';
        return axios.post('/control/queryForList.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    getSmxsData = (params) => {
        return axios.post('/getSmxsData.view', qs.stringify(params)).then(res => res.data);
    };
}
export default getSmxsData;
