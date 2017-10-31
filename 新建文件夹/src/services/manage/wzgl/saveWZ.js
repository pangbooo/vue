/**
 * 保存文章
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { saveWZService } from '@/api/common.js';
var saveWz;

if (staticApi.staticApi) {
    saveWz = (params, lmids) => {
        let param = {};
        let tableId = '47c2c4885d778155015d81d10ab00021';
        param.tableId = tableId;
        var lmid = '[';
            for (let i = 0; i < lmids.length; i++) {
                  if (i === lmids.length - 1) {
                        lmid += '"' + lmids[i] + '"';
                  } else {
                        lmid += '"' + lmids[i] + '",';
                  }
            }
            lmid += ']';
            // console.log(lmid);
        param.lmids = lmid;
        // param['script'] = 'updateCatalogByUUID';
        // param['replaceMap'] = { developer: 'hlwj' };
        // param['args'] = [params.LMMC, params.LMDM, params.uuid];
        param.params = params;
        return saveWZService(param);
    };
} else {
    saveWz = (params) => {
        return axios.post('/saveWz.view', qs.stringify(params)).then(res => {
            // console.log(params);
            return res.data;
        });
    };
}
export default saveWz;
