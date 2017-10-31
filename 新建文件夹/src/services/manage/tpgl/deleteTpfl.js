/**
 * 获取投票信息列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webCommonDelByIds } from '@/api/manage.js';
import { tableIds } from '@/api/tableId.js';
var deleteTpfl;

if (staticApi.staticApi) {
      deleteTpfl = (params) => {
            let param = {};
            if (!params) {
                  params = {};
            }
            param.tableId = tableIds['投票分类'];
            param.uuids = params.uuids;
            // params['script'] = 'getYhglGrid';
            // params['replaceMap'] = { 'developer': 'hlwj' };
            // params['replaceMap'] = JSON.stringify(params['replaceMap']);
            // params['args'] = '["%' + params.dataKeys + '%","%' + params.dataKeys + '%","%' + params.dataKeys + '%","%' + params.dataStatus + '%"]';
            // params['keys'] = '[]';
            // params['pageSize'] = params.page_size;
            // params['nowPage'] = params.cur_page;
            // return axios.post('/control/getGrid.view', qs.stringify(params)).then(res => res.data);
            return webCommonDelByIds(param);
      };
} else {
      deleteTpfl = (params) => {
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
export default deleteTpfl;
