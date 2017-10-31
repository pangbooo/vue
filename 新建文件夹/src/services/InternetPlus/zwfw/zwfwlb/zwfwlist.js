import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';

import { webGetWZGrid } from '@/api/common.js';

var getZWFWList;

if (staticApi.staticApi) {
    getZWFWList = (params) => {
        return webGetWZGrid(params);
    };
} else {
    getZWFWList = (params) => {
        return webGetWZGrid(params);
    };
}
export default getZWFWList;
