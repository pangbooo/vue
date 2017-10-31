/*
    名称：登录
    作者：马日
    创建时间：2017年9月19日
    修改人：
    最后修改时间：2017年9月19日
*/
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import md5 from 'js-md5';
var login;

if (staticApi.staticApi) {
	login = (params) => {
		if (!params) {
			params = {};
			params.username = 'whl';
			params.password = md5('1');
		}
		let param = {};
		param.userName = params.userName;
		param.checkCode = params.checkCode;
		param.password = md5(params.password);
		return axios.post('/oApp/login', qs.stringify(param)).then(res => res.data);
	};
} else {
	login = (params) => {
		if (!params) {
			params = {};
			params.username = 'whl';
			params.password = '1';
		}
		return axios.post('/oApp/login', qs.stringify(params)).then(res => res.data);
	};
}
export default login;
