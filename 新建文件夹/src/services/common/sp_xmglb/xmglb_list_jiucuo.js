/**
 * 获取我的收藏列表信息列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetMySimpleGridList } from '@/api/manage.js';
var getXmglbGrid;
if (staticApi.staticApi) {
      getXmglbGrid = (params) => {
            return webGetMySimpleGridList(params);
      };
} else {
      getXmglbGrid = (params) => {
            return webGetMySimpleGridList(params).then(
                  res => {
                        res.data['DataList'] = require('./xmglb-jc.js');
                        return res;
                  }
            );
      };
}
export default getXmglbGrid;
