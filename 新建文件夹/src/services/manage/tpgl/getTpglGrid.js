/**
 * 获取投票信息列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetSimpleGridList } from '@/api/common.js';
import { tableIds } from '@/api/tableId.js';
var getTpztGrid;

if (staticApi.staticApi) {
      getTpztGrid = (params) => {
            params.tableid = tableIds['投票主题'];
            return webGetSimpleGridList(params);
      };
} else {
      getTpztGrid = (params) => {
            return axios.post('/getTpgl.view', qs.stringify(params)).then(res => {
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
export default getTpztGrid;
