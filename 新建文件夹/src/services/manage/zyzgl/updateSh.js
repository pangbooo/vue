/**
 * 删除投票主题
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webUpdateBatch } from '@/api/manage.js';
import { tableIds } from '@/api/tableId.js';
var updateShZyzxx;

if (staticApi.staticApi) {
      updateShZyzxx = (params) => {
            let param = {};
            if (!params) {
                  params = {};
            }
            param.tableId = tableIds['志愿者管理'];
            param.uuids = params.uuids;
            param.setMap = { '审核结果': params.shjg };
            return webUpdateBatch(param);
      };
} else {
      updateShZyzxx = (params) => {
            return axios.post('/getTpgl.view', qs.stringify(params)).then(res => res.data);
      };
}
export default updateShZyzxx;
