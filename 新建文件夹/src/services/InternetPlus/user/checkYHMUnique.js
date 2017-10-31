/*
    名称：注册用户名唯一检测
    作者：李文达
    创建时间：2017年9月19日
    修改人：李文达
    最后修改时间：2017年9月19日
*/
import axios from '@/config/axios/axios';
import qs from 'qs';
var checkYHMUnique;

checkYHMUnique = (params) => {
    let res = {};

    if (params.YHLX === '市民') {
        res.manageType = 'user';
    } else {
        res.manageType = 'business';
    }
    res.xydmOrYhmc = params.YHM;
    return axios.post('/web/isExistXydmOrYhmc', qs.stringify(res)).then(res => {
        return res.data;
    });
};

export default checkYHMUnique;
