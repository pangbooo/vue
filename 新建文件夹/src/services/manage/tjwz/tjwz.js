import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var tjwz;

if (staticApi.staticApi) {
	tjwz = (params) => {
	if (!params) {
        params = {};
    }
    params['script'] = 'tjwz';
	params['replaceMap'] = '{ "developer": "hlwj" }';
	params['args'] = '["' + params.wzbt + '","' +
					params.nrbt + '","' +
					params.dbt + '","' +
					params.fbt + '","' +
					params.yt + '","' +
					params.zz + '","' +
					params.bj + '","' +
					params.ly + '","' +
					params.tzlj + '","' +
					params.bq + '","' +
					params.gjz + '","' +
					params.nrzy + '","' +
					params.sfxs + '","' +
					params.fbsj + '","' +
					params.xxsj + '","' +
					params.zyx + '","' +
					params.djl + '","' +
					params.sfzd + '"]';
    params['keys'] = '[]';

	return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
	};
} else {
	tjwz = (params) => {
	return axios.post('/getStatus.view', qs.stringify(params)).then(res => res.data);
	};
}

export default tjwz;
