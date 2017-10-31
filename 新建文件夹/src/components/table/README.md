
## 通用列表组件

###### 该列表组件是基于element-ui 的table组件进行扩展，可自定义列表头信息。

###### 引用事例。
 <idttable  :page_size="page_size" ref="multipleTable" :fields="fields" :dataResult="tableData" @handleCurrentChange="handleCurrentChange">
        <div slot="buttonHandlers">
            <!-- 列表头自定义按钮 -->
             <el-button class="handle-del mr10" @click="handleBatchDelete()">批量删除</el-button>
            </div>
</idttable>
说明：
page_size：每页显示条数
ref:组件名，根据需要填写
fields：列表头字段信息
dataResult：列表数据
handleCurrentChange：上一页，下一页事件
###### 
---
### data

* 
```javascript
  fields数据格式：
    例如：
        fields:{fielddata:[
                    {fieldname:'YHMC',width:'150',showname:'帐户',sortable:true},
                    {fieldname:'ZSXM',width:'150',showname:'姓名',sortable:true},
                    {fieldname:'SFZH',width:'200',showname:'身份证号',sortable:false},
                    {fieldname:'ZHZT',showname:'状态',width:'90'},
                ],opertions:{showname:'操作',width:'250',buttons:[{name:'通过审核',type:'danger',icon:'edit',script:"scope.row.ZHZT=='登记' || scope.row.ZHZT==''",handler:'handleupdateYhzt',handlerargs:'开通'},{name:'解禁',type:'warning',script:"scope.row.ZHZT=='禁用'",handler:'handleupdateYhzt',handlerargs:'开通'},{name:'禁用',type:'warning',script:"scope.row.ZHZT=='开通'",handler:'handleupdateYhzt',handlerargs:'禁用'},{name:'删除',type:'danger',handler:'handleDelete',handlerargs:''}]}
                }
        其中fieldname字段名
            width：列表宽度
            showname：列表显示名
            sortable：是否排序
            formatter:格式化输出
            opertions：每行的操作集
                      showname：列表头显示名
                      width：同上
                      buttons：按钮组
                                name：按钮名称
                                type：按钮样式
                                icon: 图标
                                script：按钮是显示可执行脚本，内容可使用scope.row表示本行
                                handler：点击触发执行的方法名，该方法名第一个参数为row对象(本行数据)，第二个参数为handlerargs。
                                handlerargs：触发事件参数

---
事件：
    @rowDblclick :双击事件 参数为(row,event)
    @handleCurrentChange 点击上一页，下一页事件 参数为：val 第几页
    @sortChange 排序
##问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

---
##关于作者

```
  倚天-电子政务事业部-尧永中
```