/**
 * 获取投票信息列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetSimpleGridList } from '@/api/common.js';
import { tableIds } from '@/api/tableId.js';
var getTpglTypeGrid;

if (staticApi.staticApi) {
      getTpglTypeGrid = (params) => {
            params.tableid = tableIds['投票分类'];
            // if (!params) {
            //       params = {};
            // }
            // params['script'] = 'getYhglGrid';
            // params['replaceMap'] = { 'developer': 'hlwj' };
            // params['replaceMap'] = JSON.stringify(params['replaceMap']);
            // params['args'] = '["%' + params.dataKeys + '%","%' + params.dataKeys + '%","%' + params.dataKeys + '%","%' + params.dataStatus + '%"]';
            // params['keys'] = '[]';
            // params['pageSize'] = params.page_size;
            // params['nowPage'] = params.cur_page;
            // return axios.post('/control/getGrid.view', qs.stringify(params)).then(res => res.data);
            return webGetSimpleGridList(params);
      };
} else {
      getTpglTypeGrid = (params) => {
            return axios.post('/getTpglType.view', qs.stringify(params)).then(res => {
                  let oldData = res.data;
                  let oldArr = oldData.result.DataList;
                  let newData = {
                        result: {
                              totalRows: 30,
                              DataList: []
                        }
                  };
                  //  都为空
                  oldData.result.DataList = oldData.result.DataList.slice(params.page_size * (params.cur_page - 1), params.page_size * params.cur_page);
                  return oldData;
            });
      };
}
export default getTpglTypeGrid;
