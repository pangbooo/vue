/**
 * 获取转移支付列表信息列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetSimpleGridList } from '@/api/common.js';

var getYhglGrid;
if (staticApi.staticApi) {
      getYhglGrid = (params) => {
            return webGetSimpleGridList(params);
      };
} else {
      getYhglGrid = (params) => {
            return webGetSimpleGridList(params).then(
                  res => {
                        res.data['DataList'] = require('./zxzjlist.js');
                        return res;
                  }
            );
      };
}
export default getYhglGrid;
