/**
 * 注册时，检测用户名唯一
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getCode } from '@/api/common.js';

var checkYzm;

if (staticApi.staticApi) {
    checkYzm = (params) => {
         return getCode();
    };
} else {
    checkYzm = (params) => {
        return getCode();
   };
}
export default checkYzm;
