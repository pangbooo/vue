import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var wyjy;

if (staticApi.staticApi) {
    wyjy = (params) => {
    if (!params) {
        params = {};
    }
    params['script'] = 'wyjy';
	params['replaceMap'] = '{ "developer": "hlwj" }';
	params['args'] = '["' + params.jybt + '","' + params.jynr + '","' + params.dwmc + '","' + params.sfgk + '","' + params.ndxm + '","' + params.nddh + '","' + params.ndxb + '","' + params.ndyx + '","' + params.dffs + '"]';
    params['keys'] = '[]';
	return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    wyjy = (params) => {
        return axios.post('/getStatus.view', qs.stringify(params)).then(res => res.data);
    };
}
export default wyjy;
