import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getArticle } from '@/api/common.js';

var getZWFWDetail;

if (staticApi.staticApi) {
    getZWFWDetail = (params) => {
        return getArticle(params);
    };
} else {
    getZWFWDetail = (params) => {
        return getArticle(params);
    };
}
export default getZWFWDetail;
