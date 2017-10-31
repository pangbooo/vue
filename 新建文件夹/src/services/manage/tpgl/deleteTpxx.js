/**
 * 删除投票主题
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webCommonDelByIds } from '@/api/manage.js';
import { tableIds } from '@/api/tableId.js';
var deleteTpxx;

if (staticApi.staticApi) {
      deleteTpxx = (params) => {
            // if (!params) {
            //       params = {};
            // }
            // params['script'] = 'deleteTpgl';
            // params['replaceMap'] = { 'developer': 'hlwj' };
            // params['replaceMap'] = JSON.stringify(params['replaceMap']);
            // params['args'] = JSON.stringify(params['args']);
            // params['keys'] = '[]';
            // return axios.post('/control/execute.view', qs.stringify(params)).then(res => res.data);
            let param = {};
            if (!params) {
                  params = {};
            }
            param.tableId = tableIds['投票选项'];
            param.uuids = params.uuids;
            return webCommonDelByIds(param);
      };
} else {
      deleteTpxx = (params) => {
            return axios.post('/getTpgl.view', qs.stringify(params)).then(res => res.data);
      };
}
export default deleteTpxx;
