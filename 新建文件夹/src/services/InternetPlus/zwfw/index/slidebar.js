import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { webGetLMTree } from '@/api/common.js';

var getZWFWSlidebar;

if (staticApi.staticApi) {
    getZWFWSlidebar = (params) => {
        let param = {};
        param.puuid = params.puuid;
        param.level = params.level;
        return webGetLMTree(param);
    };
} else {
    getZWFWSlidebar = (params) => {
        let param = {};
        param.puuid = params.puuid;
        param.level = params.level;
        return webGetLMTree(param);
    };
}
export default getZWFWSlidebar;
