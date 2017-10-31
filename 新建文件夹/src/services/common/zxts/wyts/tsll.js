/**
 * 获取投诉列表
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getForm } from '@/api/common.js';
var data;
if (staticApi.staticApi) {
      data = (params) => {
            return getForm(params);
      };
} else {
      data = (params) => {
            return getForm(params).then(
                  res => {
                        res.data = require('./tslb_content.js');
                        return res;
                  }
            );
      };
}
export default data;
