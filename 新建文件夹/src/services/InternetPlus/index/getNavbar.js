/**
 * 智慧辽源-首页-获取网站导航数据
 * author:kxc
 * 2017-08-08
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getNavbarService } from '@/api/common.js';
var getNavbar;

function GetQueryString(name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

getNavbar = (params) => {
    let uuid = GetQueryString('UUID');
    let param = {};
    if (uuid) {
        // param = { puuid: uuid };
    }
    return getNavbarService(param);
};

export default getNavbar;
