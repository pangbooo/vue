
## 通用tree

###### 这是一个通用“树”组件，支持多种风格展示。

###### 使用zTree保证树的多功能性和高效性。

###### 当前使用版本zTree v3.5.29， API文档：http://www.treejs.cn/v3/api.php
---
## 使用API


### data

* ztree的节点数据，必须满足ztree的数据模式

```javascript
    data: [
        { id: 1, pId: 0, name: '父节点A', open: true},
        { id: 11, pId: 1, name: '叶子节点1'},
        { id: 12, pId: 1, name: '叶子节点2'},
        { id: 13, pId: 1, name: '叶子节点3'},
        { id: 2, pId: 0, name: '父节点B', open: true},
        { id: 21, pId: 2, name: '叶子节点1'},
        { id: 22, pId: 2, name: '叶子节点2'},
        { id: 23, pId: 2, name: '叶子节点3'},
        { id: 3, pId: 0, name: '父节点C', open: true },
        { id: 31, pId: 3, name: '叶子节点1'},
        { id: 32, pId: 3, name: '叶子节点2'},
        { id: 33, pId: 3, name: '叶子节点3'}
    ]
    
```
### setting

* ztree的setting对象，请遵循zTreeAPI中的setting配置（此处完全开放）

```javascript
    setting: {
        data: {
            simpleData: {
                enable: true
            }
        }
    }
```

### skin

* tree的显示风格，可选参数：
    *  zTreeStyle  ————zTree的默认风格
    *  metroStyle（默认）  ————metro风格，类似bootStrap风格

### 事件函数

* ###### onClick(event, treeId, treeNode, clickFlag) 用于捕获节点被点击的事件回调函数
    * eventjs 类型：event 对象 说明：标准的 js event 对象
    * treeId  类型：String 说明：对应 zTree 的 treeId，便于用户操控
    * treeNode  类型：JSON 说明：被点击的节点 JSON 数据对象
    * clickFlag  类型：Number 说明：节点被点击后的选中操作类型，详细请查阅zTree官网API


* ###### onDblClick(event, treeId, treeNode) 用于捕获 zTree 上鼠标双击之后的事件回调函数
    * eventjs 类型：event 对象 说明：标准的 js event 对象
    * treeId  类型：String 说明：对应 zTree 的 treeId，便于用户操控
    * treeNode  类型：JSON 说明：鼠标双击时所在节点的 JSON 数据对象  ####如果不在节点上，则返回 null


* ###### onCheck(event, treeId, treeNode) 用于捕获 checkbox / radio 被勾选 或 取消勾选的事件回调函数
    * eventjs 类型：event 对象 说明：标准的 js event 对象
    * treeId  类型：String 说明：对应 zTree 的 treeId，便于用户操控
    * treeNode  类型：JSON 说明：被勾选 或 取消勾选的节点 JSON 数据对象


* ###### afterTreeInit(treeObject)  zTree加载完毕后触发的函数
    * treeObject  类型：JSON 说明：整个树的 JSON 数据对象
    


---
##问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* QQ: 350688982
* 手机: 15841131512（微信）


---
##关于作者

```
  倚天-电子政务事业部-孔祥超
```