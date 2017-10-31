import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var wyjylb;

if (staticApi.staticApi) {
    wyjylb = (params) => {
    if (!params) {
        params = {};
    }
    params['script'] = 'wyjylb';
	params['replaceMap'] = '{ "developer": "hlwj" }';
	params['args'] = '["%' + params.dataKeys + '%","%' + params.dataKeys + '%","%' + params.dataKeys + '%"]';
    params['keys'] = '[]';
    params['pageSize'] = params.pageSize;
    params['nowPage'] = params.currentPage;
	return axios.post('/control/getGrid.view', qs.stringify(params)).then(res => res.data);
    };
} else {
    wyjylb = (params) => {
        return axios.post('/wyjylb.view', qs.stringify(params)).then(res => {
            let oldData = res.data;
            let oldArr = oldData.result.DataList;
            let newData = {
                result: {
                    totalRows: 30,
                    DataList: []
                }
            };
            if (params.dataKeys !== '') {
                //  关键字不为空
                if (params.dataKeys !== '') {
                      for (let i = 0; i < oldArr.length; i++) {
                            for (let t in oldArr[i]) {
                                  // console.log(oldArr[i][t]);
                                  if (oldArr[i][t].indexOf(params.dataKeys) !== -1) {
                                        newData.result.DataList.push(oldArr[i]);
                                        break;
                                  }
                            }
                      }
                }
                newData.result.totalRows = newData.result.DataList.length;
                newData.result.DataList = newData.result.DataList.slice(params.pageSize * (params.currentPage - 1), params.pageSize * params.currentPage);
                return newData;
            } else {
                //  都为空
                oldData.result.totalRows = oldData.result.DataList.length;
                oldData.result.DataList = oldData.result.DataList.slice(params.pageSize * (params.currentPage - 1), params.pageSize * params.currentPage);
                return oldData;
            }
        });
    };
}
export default wyjylb;
