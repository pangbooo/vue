import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetLMTree } from '@/api/common.js';

var getZWFWSlidebar;

if (staticApi.staticApi) {
    getZWFWSlidebar = (params) => {
    };
} else {
    getZWFWSlidebar = (params) => {
    };
}
export default getZWFWSlidebar;
