/**
 * 获取我的办件列表信息列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getMatterLogisticsInfoList } from '@/api/manage.js';
var getXmglbGrid;
if (staticApi.staticApi) {
      getXmglbGrid = (params) => {
            return getMatterLogisticsInfoList(params);
      };
} else {
      getXmglbGrid = (params) => {
            return webGetMySimpleGridList(params).then(
                  res => {
                        res.data['DataList'] = require('./xmglb-bj.js');
                        return res;
                  }
            );
      };
}
export default getXmglbGrid;
