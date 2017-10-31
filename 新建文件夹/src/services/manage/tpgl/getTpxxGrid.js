/**
 * 获取投票信息列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetSimpleGridList } from '@/api/common.js';
import { tableIds } from '@/api/tableId.js';
var getTpxxGrid;

if (staticApi.staticApi) {
      getTpxxGrid = (params) => {
            params.tableid = tableIds['投票选项'];
            params.filter = { '主题id': params.主题id };
            return webGetSimpleGridList(params);
      };
} else {
      getTpxxGrid = (params) => {
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
export default getTpxxGrid;
