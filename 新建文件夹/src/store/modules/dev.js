/*
 * @文档描述: 可视化开发
 * @参数: 无
 * @作者: 孔祥超
 * @创建时间: 2017-10-11 15:59:47
 * @Last Modified by: 孔祥超
 * @Last Modified time: 2017-10-11 16:40:30
 */

// initial state
// shape: [{ id, quantity }]
const state = {
    newObject: {
        flag: false, // 拖拽新增组件标识
        type: '' // 拖拽新增组件类型
    },
    componentSetting: {
        id: '',
        name: '',
        displayname: '',
        styledata: {'float': 'right'},
        idx: 0
    },
    rootcomponentsArray: [
    ], // 开发页面组件数据结构
    rootcomponents: {
        // 'id': { id: '组件ID', idx: '序号', pid: '所属容器ID', name: '组件名', time: '创建时间', compdata: '组件内容所设置的属性对象', containers: [{ id: '容器ID', pid: '所属组件ID' }, { id: '容器ID', pid: '所属组件ID' }] }
        // 在创建组件时，要把创建的对像到该对象中，如果是容器组件时，还要把相关生成的容器ID放到rootContainer。
        // 'el-1': { id: 'el-1', idx: 12, pid: 'root', name: 'layout12' },
        // 'el-2': { id: 'el-2', idx: 13, pid: 'root', name: 'layout12' },
        // 'el-3': { id: 'el-3', idx: 2, pid: 'root', name: 'layout66' },
        // 'el-4': { id: 'el-4', idx: 1, pid: 'root', name: 'layout12' },
        // 'el-5': { id: 'el-5', idx: 1, pid: 'con-1', name: 'layout66' },
        // 'el-6': { id: 'el-6', idx: 3, pid: 'con-1', name: 'layout12' },
        // 'el-7': { id: 'el-7', idx: 2, pid: 'con-1', name: 'layout66' },
        // 'el-8': { id: 'el-8', idx: 0, pid: 'con-2', name: 'layout12' },
        // 'el-9': { id: 'el-9', idx: 0, pid: 'con-3', name: 'layout12' },
        // 'el-10': { id: 'el-10', idx: 0, pid: 'con-4', name: 'layout12' },
        // 'el-11': { id: 'el-11', idx: 0, pid: 'con-5', name: 'layout12' }
    },
    rootContainer: {  // 容器数组
        // id: { id: '容器组件ID', pid: '所属组件ID' }
        // 0: { id: '0', pid : ''}
        // 'con-1': { id: 'con-1', idx: 0, pid: 'el-1' },
        // 'con-2': { id: 'con-2', idx: 2, pid: 'el-1' },
        // 'con-3': { id: 'con-3', idx: 1, pid: 'el-1' },
        // 'con-4': { id: 'con-4', idx: 0, pid: 'el-9' },
        // 'con-5': { id: 'con-5', idx: 0, pid: 'el-10' },
        // 'con-6': { id: 'con-5', idx: 2, pid: 'el-11' },
        // 'con-7': { id: 'con-5', idx: 1, pid: 'el-11' }
    },
    LayoutArray: [
        { id: 'layout12-com', pid: 'root', name: 'layout12', idx: 0, 'componentsinfo': [{ id: 'layout12-lay-0', idx: 0, 'container': [{ id: 'layout12-lay-0-0', pid: 'layout12-com', idx: 0 }] }] },
        { id: 'layout66-com', pid: 'root', name: 'layout66', idx: 1, 'componentsinfo': [{ id: 'layout66-lay-0', idx: 0, 'container': [{ id: 'layout66-lay-0-0', pid: 'layout66-com', idx: 0 }] }, { id: 'layout66-lay-1', idx: 0, 'container': [{ id: 'layout66-lay-1-0', pid: 'layout66-com', idx: 0 }] }] },
        { id: 'layout210-com', pid: 'root', name: 'layout210', idx: 1, 'componentsinfo': [{ id: 'layout210-lay-0', idx: 0, 'container': [{ id: 'layout210-lay-0-0', pid: 'layout210-com', idx: 0 }] }, { id: 'layout210-lay-1', idx: 0, 'container': [{ id: 'layout210-lay-1-0', pid: 'layout210-com', idx: 0 }] }] },
        { id: 'layout102-com', pid: 'root', name: 'layout102', idx: 1, 'componentsinfo': [{ id: 'layout102-lay-0', idx: 0, 'container': [{ id: 'layout102-lay-0-0', pid: 'layout102-com', idx: 0 }] }, { id: 'layout102-lay-1', idx: 0, 'container': [{ id: 'layout102-lay-1-0', pid: 'layout102-com', idx: 0 }] }] },
        { id: 'layout39-com', pid: 'root', name: 'layout39', idx: 1, 'componentsinfo': [{ id: 'layout39-lay-0', idx: 0, 'container': [{ id: 'layout39-lay-0-0', pid: 'layout39-com', idx: 0 }] }, { id: 'layout39-lay-1', idx: 0, 'container': [{ id: 'layout39-lay-1-0', pid: 'layout39-com', idx: 0 }] }] },
        { id: 'layout93-com', pid: 'root', name: 'layout93', idx: 1, 'componentsinfo': [{ id: 'layout93-lay-0', idx: 0, 'container': [{ id: 'layout93-lay-0-0', pid: 'layout93-com', idx: 0 }] }, { id: 'layout93-lay-1', idx: 0, 'container': [{ id: 'layout93-lay-1-0', pid: 'layout93-com', idx: 0 }] }] },
        { id: 'layout48-com', pid: 'root', name: 'layout48', idx: 1, 'componentsinfo': [{ id: 'layout48-lay-0', idx: 0, 'container': [{ id: 'layout48-lay-0-0', pid: 'layout48-com', idx: 0 }] }, { id: 'layout48-lay-1', idx: 0, 'container': [{ id: 'layout48-lay-1-0', pid: 'layout48-com', idx: 0 }] }] },
        { id: 'layout84-com', pid: 'root', name: 'layout84', idx: 1, 'componentsinfo': [{ id: 'layout84-lay-0', idx: 0, 'container': [{ id: 'layout84-lay-0-0', pid: 'layout84-com', idx: 0 }] }, { id: 'layout84-lay-1', idx: 0, 'container': [{ id: 'layout84-lay-1-0', pid: 'layout84-com', idx: 0 }] }] },
        { id: 'layout444-com', pid: 'root', name: 'layout444', idx: 1, 'componentsinfo': [{ id: 'layout444-lay-0', idx: 0, 'container': [{ id: 'layout444-lay-0-0', pid: 'layout444-com', idx: 0 }] }, { id: 'layout444-lay-1', idx: 0, 'container': [{ id: 'layout444-lay-1-0', pid: 'layout444-com', idx: 0 }] }, { id: 'layout444-lay-2', idx: 0, 'container': [{ id: 'layout444-lay-2-0', pid: 'layout444-com', idx: 0 }] }] },
        { id: 'layout264-com', pid: 'root', name: 'layout264', idx: 1, 'componentsinfo': [{ id: 'layout264-lay-0', idx: 0, 'container': [{ id: 'layout264-lay-0-0', pid: 'layout264-com', idx: 0 }] }, { id: 'layout264-lay-1', idx: 0, 'container': [{ id: 'layout264-lay-1-0', pid: 'layout264-com', idx: 0 }] }, { id: 'layout264-lay-2', idx: 0, 'container': [{ id: 'layout264-lay-2-0', pid: 'layout264-com', idx: 0 }] }] }
    ], // 开发页面组件数据结构
    Layout: {
        // 'id': { id: '组件ID', idx: '序号', pid: '所属容器ID', name: '组件名', time: '创建时间', compdata: '组件内容所设置的属性对象', containers: [{ id: '容器ID', pid: '所属组件ID' }, { id: '容器ID', pid: '所属组件ID' }] }
        // 在创建组件时，要把创建的对像到该对象中，如果是容器组件时，还要把相关生成的容器ID放到rootContainer。
        // 'el-1': { id: 'el-1', idx: 12, pid: 'root', name: 'layout12' },
        // 'el-2': { id: 'el-2', idx: 13, pid: 'root', name: 'layout12' },
        // 'el-3': { id: 'el-3', idx: 2, pid: 'root', name: 'layout66' },
        // 'el-4': { id: 'el-4', idx: 1, pid: 'root', name: 'layout12' },
        // 'el-5': { id: 'el-5', idx: 1, pid: 'con-1', name: 'layout66' },
        // 'el-6': { id: 'el-6', idx: 3, pid: 'con-1', name: 'layout12' },
        // 'el-7': { id: 'el-7', idx: 2, pid: 'con-1', name: 'layout66' },
        // 'el-8': { id: 'el-8', idx: 0, pid: 'con-2', name: 'layout12' },
        // 'el-9': { id: 'el-9', idx: 0, pid: 'con-3', name: 'layout12' },
        // 'el-10': { id: 'el-10', idx: 0, pid: 'con-4', name: 'layout12' },
        // 'el-11': { id: 'el-11', idx: 0, pid: 'con-5', name: 'layout12' }
    },
    baseContainer: {  // 容器数组
        // id: { id: '容器组件ID', pid: '所属组件ID' }
        // 0: { id: '0', pid : ''}
        // 'con-1': { id: 'con-1', idx: 0, pid: 'el-1' },
        // 'con-2': { id: 'con-2', idx: 2, pid: 'el-1' },
        // 'con-3': { id: 'con-3', idx: 1, pid: 'el-1' },
        // 'con-4': { id: 'con-4', idx: 0, pid: 'el-9' },
        // 'con-5': { id: 'con-5', idx: 0, pid: 'el-10' },
        // 'con-6': { id: 'con-5', idx: 2, pid: 'el-11' },
        // 'con-7': { id: 'con-5', idx: 1, pid: 'el-11' }
    },
    baseLayoutArray: {
        'layout12': { id: 'layout12', name: 'layout12', layoutdata: [12] },
        'layout66': { id: 'layout66', name: 'layout66', layoutdata: [6, 6] },
        'layout210': { id: 'layout210', name: 'layout210', layoutdata: [2, 10] },
        'layout102': { id: 'layout102', name: 'layout102', layoutdata: [10, 2] },
        'layout39': { id: 'layout39', name: 'layout39', layoutdata: [3, 9] },
        'layout93': { id: 'layout93', name: 'layout93', layoutdata: [9, 3] },
        'layout48': { id: 'layout48', name: 'layout48', layoutdata: [4, 8] },
        'layout84': { id: 'layout84', name: 'layout84', layoutdata: [8, 4] },
        'layout444': { id: 'layout444', name: 'layout444', layoutdata: [4, 4, 4] },
        'layout264': { id: 'layout264', name: 'layout264', layoutdata: [2, 6, 4] }
    },
    baseComponentsArray: [
        { id: 'bt', pid: 'root', name: 'bt', displayname: '标题栏', idx: 0 },
        {id: 'headerpage', pid: 'root', name: 'headerpage', displayname: '网站头', idx: 0},
        {id: 'footerpage', pid: 'root', name: 'footerpage', displayname: '网站底部', idx: 0},
        {id: 'searchpage', pid: 'root', name: 'searchpage', displayname: '顶部搜索', idx: 0},
        {id: 'pagination', pid: 'root', name: 'pagination', displayname: '分页', idx: 0},
        {id: 'xzqlqdleft', pid: 'root', name: 'xzqlqdleft', displayname: '部门列表', idx: 0},
        {id: 'xzqlqdright', pid: 'root', name: 'xzqlqdright', displayname: '清单列表', idx: 0},
        {id: 'idt-importnews', pid: 'root', name: 'idt-importnews', displayname: '重要公告', idx: 0},
        {id: 'idt-hotsearch', pid: 'root', name: 'idt-hotsearch', displayname: '热门搜索', idx: 0},
        {id: 'idt-centernav', pid: 'root', name: 'idt-centernav', displayname: '中心导航', idx: 0},
        {id: 'idt-focusnews', pid: 'root', name: 'idt-focusnews', displayname: '焦点服务', idx: 0}
    ]
};
  // mutations
const mutations = {
    setNewObject: (state, object) => {
        state.newObject = object;
    },
    setComponentSetting: (state, object) => {
        state.componentSetting = object;
    },
    setFontSize: (state, object) => {
        state.setting.fontSize = object.fontSize;
    },
    setRownum: (state, object) => {
        state.setting.rownum = object.rownum;
    },
    setIsLoadRoutes: (state, object) => {
        state.setting.isLoadRoutes = object.isLoadRoutes;
    },
    setRootcomponents: (state, object) => {
        state.rootcomponents = object;
    },
    insertContainer: (state, object) => { // 插入容器
        state.rootContainer[object.id] = object;
    },
    insertComponent: (state, object) => { // 插入组件
        if (state.rootcomponents[object.id]) {
              // 如果有值
              let oldcomponent = state.rootcomponents[object.id];
              if (oldcomponent.pid !== object.pid) {
                    let oldpid = oldcomponent.pid;
                    for (let componentId in state.rootcomponents) {
                          if (componentId === object.id) {
                                continue;
                          }
                          let component = state.rootcomponents[componentId];
                          if (oldpid === component.pid) {
                                if (oldpid <= component.idx) {
                                      component.idx = component.idx - 1;
                                }
                          }
                    }
              }
        }
        for (let componentId in state.rootcomponents) {
              let oldcomponent = state.rootcomponents[object.id];
              if (componentId === object.id) {
                    continue;
              }
              let component = state.rootcomponents[componentId];
              if (object.pid === component.pid) {
                    if (!oldcomponent || oldcomponent.idx > object.idx) {
                          if (object.idx <= component.idx) {
                                component.idx = component.idx + 1;
                          }
                    } else if (oldcomponent.idx < object.idx) {
                          if (oldcomponent.idx < component.idx && object.idx >= component.idx) {
                                component.idx = component.idx - 1;
                          }
                    }
              }
        }
        state.rootcomponents[object.id] = object;
    },
    deleteComponent: (state, object) => { // 删除组件
        deleteComponent(state.rootcomponents, state.rootContainer, object.id);
        refresh(state.rootcomponents, state, state.rootContainer, false);
    },
    updateContainer: (state, object) => { // 更新容器
        state.rootContainer[object.id] = object;
    },
    updateComponent: (state, object) => { // 组件数据更新
        state.rootcomponents[object.id] = object;
    },
    refresh: (state) => { // 数据刷新
        console.log('数据刷新');
        refresh(state.rootcomponents, state, state.rootContainer, false);
    }
};
// getters
const getters = {
    getComponentSetting: (state) => {
        return state.componentSetting;
    },
    getRootcomponents: (state) => {
        return state.rootcomponents;
    },
    getRootcomponentsArray: (state) => {
        refresh(state.rootcomponents, state, state.rootContainer, false);
        return state.rootcomponentsArray;
    }
};
  // actions
const actions = {};
export default {
    state,
    getters,
    mutations,
    actions
};
function compare(obj1, obj2) {
    var val1 = obj1.idx;
    var val2 = obj2.idx;
    if (val1 < val2) {
          return -1;
    } else if (val1 > val2) {
          return 1;
    } else {
          return 0;
    }
}
// 容器ID
function sortArray(objArray) {
    objArray.sort(compare);
    for (let i = 0; i < objArray.length; i++) {
          if (objArray[i].componentsinfo && objArray[i].componentsinfo.length > 0) {
                for (let j = 0; j < objArray[i].componentsinfo.length; j++) {
                      if (objArray[i].componentsinfo[j].container && objArray[i].componentsinfo[j].container.length > 0) {
                            sortArray(objArray[i].componentsinfo[j].container);
                      }
                }
                objArray[i].componentsinfo.sort(compare);
          }
    }
}
function deepCopy(source) {
    var result = {};
    for (var key in source) {
          result[key] = typeof source[key] === 'object' ? deepCopy(source[key]) : source[key];
    }
    return result;
}
/**
* @param {* 变}state
*/
function deleteComponent(rootcomponents, rootContainer, id) {
    delete rootcomponents[id];
    for (let containerId in rootContainer) {
          if (rootContainer[containerId].pid === id) {
                delete rootContainer[containerId];
                for (let componentId in rootcomponents) {
                      let component = rootcomponents[componentId];
                      if (component.pid === containerId) {
                            deleteComponent(rootcomponents, rootContainer, componentId);
                      }
                }
          }
    }
}
/**
* 刷新组件
* @param {* 组件元素的集合}rootcomponents
* @param {* 组件元素数组集合,主要供页面刷新使用 }rootcomponentsArray
* @param {* 是否更新还是刷新，如果为true,表示只更新集合，如果false进行重新生成}updateFlag
*/
function refresh(rootcomponents_, state, rootContainer_, updateFlag) {
    let rootcomponents = deepCopy(rootcomponents_);
    let rootContainer = deepCopy(rootContainer_);
    if (updateFlag) {
          for (let component of rootcomponents) {
                if (component.pid === 'root') {
                      state.rootcomponentsArray.push(component);
                }
          }
    } else {
          for (let containerId in rootContainer) {
                let container = rootContainer[containerId];
                for (let componentId in rootcomponents) {
                      let component = rootcomponents[componentId];
                      if (component.pid === containerId) {
                            if (!container.componentsinfo) {
                                  container.componentsinfo = [];
                            }
                            container.componentsinfo.push(component);
                      }
                }
          }
          let rootcomponentsArrayTemp = [];
          for (let containerId in rootContainer) {
                let container = rootContainer[containerId];
                let componentid = container.pid;
                let component = rootcomponents[componentid];
                if (!component.componentsinfo) {
                      component.componentsinfo = [];
                }
                if (container.componentsinfo) {
                      let obj = {};
                      obj.id = containerId;
                      obj.idx = container.idx;
                      obj.container = container.componentsinfo;
                      component.componentsinfo.push(obj);
                } else {
                      let obj = {};
                      obj.id = containerId;
                      obj.idx = container.idx;
                      obj.container = [container];
                      component.componentsinfo.push(obj);
                }
          }
          for (let componentId in rootcomponents) {
                let component = rootcomponents[componentId];
                if (component.pid === 'root') {
                      rootcomponentsArrayTemp.push(component);
                }
          }
          sortArray(rootcomponentsArrayTemp);
          state.rootcomponentsArray = rootcomponentsArrayTemp;
          console.log('rootcomponentsArrayTemp');
          console.log(JSON.stringify(state.rootcomponentsArray) + '');
    }
}