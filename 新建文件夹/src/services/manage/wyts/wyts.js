import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var wyts;

if (staticApi.staticApi) {
    wyts = (params) => {
    if (!params) {
        params = {};
    }
    params['script'] = 'wyts';
	params['replaceMap'] = '{ "developer": "hlwj" }';
	params['args'] = '["' + params.btsdw + '","' + params.btsrgh + '","' + params.tsnr + '","' + params.tsrxm + '","' + params.sjh + '","' + params.dffs + '","' + params.jtdz + '","' + params.sfgk + '"]';
    params['keys'] = '[]';
	return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    wyts = (params) => {
        return axios.post('/getStatus.view', qs.stringify(params)).then(res => res.data);
    };
}
export default wyts;
