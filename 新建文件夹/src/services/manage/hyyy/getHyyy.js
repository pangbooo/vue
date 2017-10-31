/**
 * 获取我要咨询列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

var getHyyy;

if (staticApi.staticApi) {
      getHyyy = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'getHyyyHt';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = '["%' + params.dataKeys + '%","%' + params.dataKeys + '%","%' + params.dataKeys + '%"]';
            params['keys'] = '[]';
            params['pageSize'] = params.pageSize;
            params['nowPage'] = params.nowPage;
            return axios.post('/control/getGrid.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      getHyyy = (params) => {
            return axios.post('/getHyyy.view', qs.stringify(params)).then(res => {
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
                      newData.result.DataList = newData.result.DataList.slice(params.pageSize * (params.nowPage - 1), params.pageSize * params.nowPage);
                      return newData;
                  } else {
                      //  都为空
                      oldData.result.totalRows = oldData.result.DataList.length;
                      oldData.result.DataList = oldData.result.DataList.slice(params.pageSize * (params.nowPage - 1), params.pageSize * params.nowPage);
                      return oldData;
                  }
            });
      };
}
export default getHyyy;
