/**
 * 获取办件列表信息列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetSimpleGridList } from '@/api/common.js';

var bjgslist;
if (staticApi.staticApi) {
      bjgslist = (params) => {
            return webGetSimpleGridList(params);
      };
} else {
      bjgslist = (params) => {
            return webGetSimpleGridList(params).then(
                  res => {
                        res.data['DataList'] = require('./xmglb.js');
                        return res;
                  }
            );
      };
}
export default bjgslist;
