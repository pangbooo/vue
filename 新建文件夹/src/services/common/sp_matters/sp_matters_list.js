/**
 * 获取用户信息列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetSimpleGridList } from '@/api/common.js';
var getSpmattersGrid;
if (staticApi.staticApi) {
      getSpmattersGrid = (params) => {
            return webGetSimpleGridList(params);
      };
} else {
      getSpmattersGrid = (params) => {
            return webGetSimpleGridList(params).then(
                  res => {
                        res.data['DataList'] = require('./sp_matters.js');
                        return res;
                  }
            );
      };
}
export default getSpmattersGrid;
