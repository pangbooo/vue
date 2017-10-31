/**
 * 删除投票主题
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webCommonDelByIds } from '@/api/manage.js';
import { tableIds } from '@/api/tableId.js';
var deleteZyzxx;

if (staticApi.staticApi) {
      deleteZyzxx = (params) => {
            let param = {};
            if (!params) {
                  params = {};
            }
            param.tableId = tableIds['志愿者管理'];
            param.uuids = params.uuids;
            return webCommonDelByIds(param);
      };
} else {
      deleteZyzxx = (params) => {
            return axios.post('/getTpgl.view', qs.stringify(params)).then(res => res.data);
      };
}
export default deleteZyzxx;
