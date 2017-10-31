import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getArticleTitleClickList } from '@/api/common.js';

var getZWFWList;

if (staticApi.staticApi) {
    getZWFWList = (params) => {
        return getArticleTitleClickList(params);
    };
} else {
    getZWFWList = (params) => {
        return getArticleTitleClickList(params);
    };
}
export default getZWFWList;
