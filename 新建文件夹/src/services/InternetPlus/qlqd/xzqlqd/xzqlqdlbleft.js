import axios from '@/config/axios/axios';
import qs from 'qs';

var data = (params) => {
    return axios.post('web/getBMList', qs.stringify(params)).then(res => res.data);
};
export default data;
