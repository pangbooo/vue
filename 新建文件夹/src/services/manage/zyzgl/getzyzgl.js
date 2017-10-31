/**
 * 获取志愿者信息列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetSimpleGridList } from '@/api/common.js';
import { tableIds } from '@/api/tableId.js';
var getZyzglGrid;
if (staticApi.staticApi) {
      getZyzglGrid = (params) => {
            let param = {};
            param.tableid = tableIds['志愿者管理'];
            if (params.shjg !== 'all') {
                  param.filter = { '审核结果': params.shjg };
            }
            param.cur_page = params.cur_page;
            param.pageSize = params.pageSize;
            return webGetSimpleGridList(param);
      };
} else {
      getZyzglGrid = (params) => {
            return axios.post('/getYhglGrid.view', qs.stringify(params)).then(res => {
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
export default getZyzglGrid;
