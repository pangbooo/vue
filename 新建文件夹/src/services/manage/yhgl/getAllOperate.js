/**
 * 获取用户操作集
 */
import axios from '@/config/axios/axios';
import qs from 'qs';
import staticApi from '@/config/axios/env.js';
import { getAllOperate } from '@/api/common.js';
// 获取操作集
var getAllOperateVars;
if (staticApi.staticApi) {
      getAllOperateVars = (params) => {
            return getAllOperate(params).then(res => {
                  let itemsMenu = [];
                  let rootId = '';
                  for (let operator of res.data) {
                        let pid = operator.parentNodeId;
                        let flag = false;
                        for (let operatorTemp of res.data) {
                              if (pid === operatorTemp.id) {
                                    flag = true;
                                    break;
                              }
                        }
                        if (!flag) {
                              rootId = operator.id;
                        }
                  }
                  for (let operator of res.data) {
                        if (operator.parentNodeId === rootId) {
                              itemsMenu.push({ title: operator.nodeName, icon: operator.imgType ? operator.imgType : 'el-icon-message', index: operator.id, id: operator.id });
                        }
                  }
                  for (let items of itemsMenu) {
                        for (let operator of res.data) {
                              if (items.id === operator.parentNodeId) {
                                    if (!items.subs) {
                                          items.subs = [];
                                    }
                                    items.subs.push({ title: operator.nodeName, icon: operator.imgType ? operator.imgType : 'el-icon-message', index: operator.customUrl ? operator.customUrl : operator.id, id: operator.id });
                              }
                        }
                  }
                  return itemsMenu;
            });
      };
} else {
      getAllOperateVars = (params) => {
            return getAllOperate(params).then(res => {
                  let itemsMenu = [];
                  let rootId = '';
                  for (let operator of res.data) {
                        let pid = operator.parentNodeId;
                        let flag = false;
                        for (let operatorTemp of res.data) {
                              if (pid === operatorTemp.id) {
                                    flag = true;
                                    break;
                              }
                        }
                        if (!flag) {
                              rootId = operator.id;
                        }
                  }
                  for (let operator of res.data) {
                        if (operator.parentNodeId === rootId) {
                              itemsMenu.push({ title: operator.nodeName, icon: operator.imgType ? operator.imgType : 'el-icon-message', index: operator.id, id: operator.id });
                        }
                  }
                  for (let items of itemsMenu) {
                        for (let operator of res.data) {
                              if (items.id === operator.parentNodeId) {
                                    if (!items.subs) {
                                          items.subs = [];
                                    }
                                    items.subs.push({ title: operator.nodeName, icon: operator.imgType ? operator.imgType : 'el-icon-message', index: operator.customUrl ? operator.customUrl : operator.id, id: operator.id });
                              }
                        }
                  }
                  return itemsMenu;
            });
      };
}
export default getAllOperateVars;
