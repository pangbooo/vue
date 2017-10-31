/**
 * 获取我的快递
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetExpress } from '@/api/common.js';
var data;
if (staticApi.staticApi) {
      data = (params) => {
            return webGetExpress(params);
      };
} else {
      data = (params) => {
            return webGetExpress(params).then(
                  res => {
                        res.data['DataList'] = require('./wdkd_list.js');
                        return res;
                  }
            );
      };
}
export default data;
