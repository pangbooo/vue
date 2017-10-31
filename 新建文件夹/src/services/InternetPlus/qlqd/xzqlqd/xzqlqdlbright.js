import axios from '@/config/axios/axios';
import qs from 'qs';
import { MessageBox } from 'element-ui';
import { tableIds } from '@/api/tableId';
var data = (params) => {
	if (!params.filter) {
		MessageBox('xzqlqdlbright.js filter参数不能为空');
		return;
	}
	if(params.filter){
		params.filter = JSON.stringify(params.filter);
	}
    return axios.post('web/getSpMattersList', qs.stringify(params)).then(res => res.data);
};
export default data;
