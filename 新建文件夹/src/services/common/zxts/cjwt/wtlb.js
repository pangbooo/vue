/**
 * 获取建议列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetSimpleGridList } from '@/api/common.js';
var data;
if (staticApi.staticApi) {
      data = (params) => {
            return webGetSimpleGridList(params);
      };
} else {
      data = (params) => {
            return webGetSimpleGridList(params).then(
                  res => {
                        res.data['DataList'] = require('./cjwt_list.js');
                        return res;
                  }
            );
      };
}
export default data;
