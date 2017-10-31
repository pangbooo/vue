/*
 * @作者: rita.ma
 * @创建时间: 2017-09-20 15:15:59
 * @最后修改人:   null
 * @最后修改时间: 2017-09-20 15:15:59
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { MessageBox } from 'element-ui';

var temp;
if (staticApi.staticApi) {
      temp = (params) => {
            if (!params.uuid) {
                  MessageBox('xzqlqddetail中【uuid】参数不能为空');
                  return;
            }
            return axios.post('web/webGetMatterByUuid', qs.stringify(params)).then(res => res.data);
      };
} else {
      temp = (params) => {
            if (!params.uuid) {
                  MessageBox('xzqlqddetail中【uuid】参数不能为空');
                  return;
            }
            return axios.post('web/webGetMatterByUuid', qs.stringify(params)).then(res => res.data);
      };
}
export default temp;
