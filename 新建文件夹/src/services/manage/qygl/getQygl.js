/**
 * 获取用户信息列表
 */
import axios from '../../config/axios/axios';
import qs from 'qs';
import staticApi from '../../config/axios/env.js';

var getQYglGrid;

if (staticApi.staticApi) {
      getQYglGrid = (params) => {
            if (!params) {
                  params = {};
            }
            params['script'] = 'web_qygllb';
            params['replaceMap'] = { 'developer': 'hlwj' };
            params['replaceMap'] = JSON.stringify(params['replaceMap']);
            params['args'] = '["%' + params.dataKeys + '%","%' + params.dataKeys + '%","%' + params.dataKeys + '%","%' + params.dataStatus + '%"]';
            params['keys'] = '[]';
            params['pageSize'] = params.page_size;
            params['nowPage'] = params.cur_page;

            return axios.post('/control/getGrid.view', qs.stringify(params)).then(res => res.data);
      };
} else {
      getQYglGrid = (params) => {
            return axios.post('/getQyglGrid.view', qs.stringify(params)).then(res => {
                  let oldData = res.data;
                  let oldArr = oldData.result.DataList;
                  let newData = {
                        result: {
                              totalRows: 30,
                              DataList: []
                        }
                  };
                  if (params.dataStatus !== '' && params.dataKeys !== '') {
                        //  两个都不为空
                       for (let i = 0; i < oldArr.length; i++) {
                              if (params.dataStatus === oldArr[i].ZHZT) {
                                  newData.result.DataList.push(oldArr[i]);
                              }
                        }
                        let changeDate = newData.result.DataList;
                        newData.result.DataList = [];
                        for (let i = 0; i < changeDate.length; i++) {
                              for (let t in changeDate[i]) {
                                    // console.log(changeDate[i][t]);
                                    if (changeDate[i][t].indexOf(params.dataKeys) !== -1) {
                                          newData.result.DataList.push(changeDate[i]);
                                          break;
                                    }
                              }
                        }
                        newData.result.totalRows = newData.result.DataList.length;
                        newData.result.DataList = newData.result.DataList.slice(params.page_size * (params.cur_page - 1), params.page_size * params.cur_page);
                        return newData;
                  } else if (params.dataStatus !== '' && params.dataKeys === '') {
                        //  删选状态不为空
                        for (let i = 0; i < oldArr.length; i++) {
                              if (params.dataStatus === oldArr[i].ZHZT) {
                                  newData.result.DataList.push(oldArr[i]);
                              }
                        }
                        newData.result.totalRows = newData.result.DataList.length;
                        newData.result.DataList = newData.result.DataList.slice(params.page_size * (params.cur_page - 1), params.page_size * params.cur_page);
                        return newData;
                  } else if (params.dataStatus === '' && params.dataKeys !== '') {
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
                        newData.result.DataList = newData.result.DataList.slice(params.page_size * (params.cur_page - 1), params.page_size * params.cur_page);
                        return newData;
                  } else {
                        //  都为空
                        oldData.result.DataList = oldData.result.DataList.slice(params.page_size * (params.cur_page - 1), params.page_size * params.cur_page);
                        return oldData;
                  }
            });
      };
}
export default getQYglGrid;
