/*
 * @文档描述: 责任清单列表
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-09-26 16:13:00 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-09-26 16:27:03
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetSimpleGridList } from '@/api/common.js'

var temp;
if (staticApi.staticApi) {
      temp = (params) => {
            return webGetSimpleGridList(params);
      };
} else {
      temp = (params) => {
            return webGetSimpleGridList(params).then(res => {
                  res.data.DataList = require('./zrqdlb_mock.js');
                  return res;
            });
      };
}
export default temp;
