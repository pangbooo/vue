
/** 通用ueidtor
* 这是一个通用富编辑器组件，支持多种风格展示。
* 使用ueidtor保证编辑器的多功能性和高效性。
* 当前使用版本ueidtor v1.4.3.3， API文档：http://ueditor.baidu.com/doc/
* 作者：李文达Leo
* 创建时间：2017-08-2
* 最后编辑时间：2017-08-2
**/


### id

* ueidtor生成节点id，用来区分用一个vue实例下两个ue实例标识符。类型：字符串

### defaultMsg

富编辑器初始加载内容。类型：字符串

### config

* 富编辑器初始加载配置参数（具体参数详见api，地址在最上方）。类型：对象

### 事件函数

父组件：
<v-ueidtor :defaultMsg="defaultMsg" :config="config" :id="ue1" ref="ue"></v-ueidtor>
getUEContent() {
    let content = this.$refs.ue.getUEContent();
    console.log(content);
}
说明：在父组件methods里加入该方法获取富编辑器内容。

---
##问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* QQ: 2627048050
* 手机: 15040481637（微信）


---
##关于作者

```
  倚天-电子政务事业部-李文达
```