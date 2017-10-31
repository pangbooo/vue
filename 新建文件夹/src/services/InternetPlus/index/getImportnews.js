/**
 * 智慧辽源-首页-获取重要新闻公告数据
 * author:kxc
 * 2017-08-08
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getBusinessRecommendList } from '@/api/common.js';

var getImportnews = (params) => {
        return getBusinessRecommendList(params);
    };

export default getImportnews;
