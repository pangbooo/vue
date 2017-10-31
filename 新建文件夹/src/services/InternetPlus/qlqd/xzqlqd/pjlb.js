/*
 * @文档描述: 行政权力清单--查看评价
 * @参数: 
 * @作者: rita.ma 
 * @创建时间: 2017-09-25 14:20:02 
 * @Last Modified by: rita.ma
 * @Last Modified time: 2017-09-25 15:59:08
 */

import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getPjjgsxList } from '@/api/common.js'

var temp;
if (staticApi.staticApi) {
      temp = (params) => {
            return getPjjgsxList(params);
      };
} else {
      temp = (params) => {
            return getPjjgsxList(params);
      };
}
export default temp;
