import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var wzqdstruct;

if (staticApi.staticApi) {
    wzqdstruct = (params) => {
        params['script'] = 'getZWFWDetail';
        return axios.post('/control/queryForDetail.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    wzqdstruct = (params) => {
        return axios.post('/wzqdstruct.view', qs.stringify(params)).then(res => {
            // console.log(res);
            return res.data;
        });
    };
}
export default wzqdstruct;
