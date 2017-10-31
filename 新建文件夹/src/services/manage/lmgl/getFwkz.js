/**
 * 获取栏目的访问控制
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { dbgetMap } from '@/api/common.js';

var getFwkz;

if (staticApi.staticApi) {
      getFwkz = (params) => {
            if (!params) {
                  params = {};
            }
            let prm = {};
            prm['script'] = 'getLM';
            prm['replaceMap'] = { 'developer': 'hlwj' };
            // params['replaceMap'] = JSON.stringify(params['replaceMap']);
            prm['args'] = [params.uuid];
            // params['keys'] = '[]';
            return dbgetMap(prm);
            // return axios.post('/control/getList.view', qs.stringify(params)).then(res => res.data);
      };
} else {
    getFwkz = (params) => {
        return axios.post('/getFwkz.view', qs.stringify(params)).then(res => {
            let newData = {
                result: [],
                status: 'success'
            };
            for (let i = 0; i < res.data.result.length; i++) {
                if (res.data.result[i].UUID === params.uuid) {
                    newData.result.push(res.data.result[i]);
                } else {}
            }
            return newData;
        });
    };
}
export default getFwkz;
