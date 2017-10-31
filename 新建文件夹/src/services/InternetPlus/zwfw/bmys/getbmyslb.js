/* 获取部门预算列表
    马日
    2017年8月22日
*/
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var getbmyslb;

if (staticApi.staticApi) {
    getbmyslb = (params) => {
        params['script'] = 'getSmxsData';
        return axios.post('/control/queryForList.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    getbmyslb = (params) => {
        return axios.post('/getbmyslb.view', qs.stringify(params)).then(res => {
            var arr = res.data.result.DataList;
            var myarr = [];
            var newdata = res.data;
            if (params.lx === '') {
                // 专项类型为空时，不检索
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].LX === params.lx) {
                        myarr.push(arr[i]);
                    }
                }
                arr.length = 0;
                for (let i = 0; i < myarr.length; i++) {
                    arr.push(myarr[i]);
                }
            }
            myarr.length = 0;
            if (params.year === '') {
                // 年限为空时，不检索
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].NX === params.year) {
                        myarr.push(arr[i]);
                    }
                }
                arr.length = 0;
                for (let i = 0; i < myarr.length; i++) {
                    arr.push(myarr[i]);
                }
            }
            myarr.length = 0;
            if (params.search === '') {
                // 搜索框为空时，不检索
            } else {
                for (let i = 0; i < arr.length; i++) {
                    if (arr[i].ZGBM.indexOf(params.search) > -1) {
                        myarr.push(arr[i]);
                    }
                }
                arr.length = 0;
                for (let i = 0; i < myarr.length; i++) {
                    arr.push(myarr[i]);
                }
            }
            newdata.result.DataList = arr;
            newdata.result.totalRows = arr.length;
            return newdata;
        });
    };
}
export default getbmyslb;
