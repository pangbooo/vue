/*
* @Author: leo
* @Date:   2017-09-01 13:43:06
 * @Last Modified by: 尧永中
 * @Last Modified time: 2017-10-07 17:26:51
* @leo的通用方法
*/

'use strict';
// 解析时间戳 
// 接收参数：毫秒数、返回时间格式：yy-MM-dd、MM-dd、不传返回yy-MM-dd hh-mm-ss
export function getTime(time, form) {
    var ts = arguments[0] || 0;
    var t, y, m, d, h, i, s;
    t = ts ? new Date(ts) : new Date();
    y = t.getFullYear();
    m = t.getMonth() + 1;
    d = t.getDate();
    h = t.getHours();
    i = t.getMinutes();
    s = t.getSeconds();
    if (form === 'yy-MM-dd') {
        return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
    } else if (form === 'MM-dd') {
        return (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d);
    } else {
        return y + '-' + (m < 10 ? '0' + m : m) + '-' + (d < 10 ? '0' + d : d) + " " + (h < 10 ? '0' + h : h) + ':' + (i < 10 ? '0' + i : i) + ':' + (s < 10 ? '0' + s : s);
    }

};
// 解析url参数
export function queryString(name, isdecode) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)');
    var r;
    if (isdecode) {
        r = decodeURI(window.location.search).substr(1).match(reg);
    } else {
        r = window.location.search.substr(1).match(reg);
    }
    if (r != null) return unescape(r[2]); return null;
};
// 截取字符串
export function subString(str, number) {
    if (str.length > number) {
        let substring = str.substring(0, number);
        return substring + '...';
    } else {
        return str;
    }
};
// 去掉字符串中的html标签
export function removeHtmlTag(str) {
    let newStr = str.replace(/<.*?>/ig, "");
    newStr = newStr.replace(/&nbsp;/ig, "");
    return newStr;
};
//判断用户是否已经登录
export function isDenglu() {
    if (localStorage.getItem("idt_App_token")) {
        return true;
    } else {
        return false;
    }
}
//封装过期控制代码
function set(key, value) {
    var curTime = new Date().getTime();
    localStorage.setItem(key, JSON.stringify({ data: value, time: curTime }));
}
function get(key, exp) {
    var data = localStorage.getItem(key);
    var dataObj = JSON.parse(data);
    if (new Date().getTime() - dataObj.time > exp) {
        console.log('信息已过期');
    } else {
        var dataObjDatatoJson = JSON.parse(dataObj.data)
        return dataObjDatatoJson;
    }
}
/**
 * 文件下载
 * @param {*} tableId:表ID
 * @param {*} uuid  材料blob uuid
 */
export function downloadFile(tableId, uuid) {
    let baseURL=process.env.BASE_IMGURL;
    baseURL=baseURL+"web/webDownload";
    let framedownload = document.getElementById("downloadIframe");
    if (!framedownload) {
        framedownload = document.createElement("iframe");
        document.body.appendChild(framedownload);
        framedownload.setAttribute("id", 'downloadIframe');
        framedownload.style.display = 'none';
    }
    framedownload.setAttribute('src', baseURL+'?tableId=' + tableId + '&uuid=' + uuid + '&isBase64=false');
    // alert(baseURL+'?tableId=' + tableId + '&uuid=' + uuid + '&isBase64=false');
}
