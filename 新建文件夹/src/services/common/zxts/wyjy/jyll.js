/**
 * 获取建议内容
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
                        res.data['DataList'] = require('./jylb_content.js');
                        return res;
                  }
            );
      };
}
export default data;
