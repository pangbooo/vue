<template>
  <div class="jsgl-doc">
    <div class="jsgl-doc__wrap">
      <div class="jsgl-doc__wrap__tips">
        <span class="jsgl-doc__wrap__tips--text">* 说明：点击应用后权限生效</span>
      </div>
      <div class="jsgl-doc__wrap__form">
        <el-table :data="gridData" border style="width: 100%" max-height="450" ref="multipleTable">
          <el-table-column  prop="name" label="名称" width="350">
            <template scope="scope">
              <span :class="'jsgl-doc__level--' + scope.row.LEVEL">
                <el-button type="primary" icon="minus" size="mini" class="smini" v-if="!scope.row.ISLEAF && scope.row.OPEN" @click="hideChildren(scope.row)"></el-button>
                <el-button type="primary" icon="plus" size="mini" class="smini" v-if="!scope.row.ISLEAF && !scope.row.OPEN" @click="showChildren(scope.row)"></el-button>
                <span :class="scope.row.ISLEAF ? 'jsgl-doc__isleaf' : ''">{{scope.row.NAME}}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column label="浏览" align="center">
            <template scope="scope">
              <el-checkbox  v-model="scope.row.LLQX" true-label="1" false-label="0"  @change="change('LLQX', scope.row)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="添加" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.TJQX" true-label="1" false-label="0" @change="change('TJQX', scope.row)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="修改" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.XGQX" true-label="1" false-label="0" @change="change('XGQX', scope.row)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="删除" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.SCQX" true-label="1" false-label="0" @change="change('SCQX', scope.row)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="置顶" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.ZDQX" true-label="1" false-label="0" @change="change('ZDQX', scope.row)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="审核" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.SHQX" true-label="1" false-label="0" @change="change('SHQX', scope.row)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="推荐" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.WZTJ" true-label="1" false-label="0" @change="change('WZTJ', scope.row)"></el-checkbox>
            </template>
          </el-table-column>
          <el-table-column label="个人" align="center">
            <template scope="scope">
              <el-checkbox v-model="scope.row.GRQX" true-label="1" false-label="0" @change="change('GRQX', scope.row)"></el-checkbox>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="jsgl-doc__wrap__form__btn">
        <el-button type="primary" icon="check" @click="save()">应用</el-button>
        <el-button type="danger" icon="close" @click="close()">关闭</el-button>                                 
      </div>
    </div>
  </div>
</template>

<script>
  import getPostLimitList from '@/services/manage/jsgl/getPostLimitList.js';
  import insertLimitData from '@/services/manage/jsgl/insertLimitData.js';
  export default {
    props: {
      form: {
        type: Object,
        default() {
          return {
            XH: ''
          }
        }
      }
    },
    data() {
      return {
        gridData: [],
        baseData: [],
        childrenData: {}
      }
    },
    created() {
      this.getData();
    },
    methods: {
      appendData(obj) {
        for (let i = 0, len = this.childrenData[obj.ID].length; i < len; i ++){
          this.gridData.splice(this.gridData.indexOf(obj) + i + 1, 0, this.childrenData[obj.ID][i]);
        }
        delete  this.childrenData[obj.ID];
      },
      change(field, obj, flag) {
        let self = this;
        for (let i = 0, len = this.gridData.length; i < len; i++ ) {
          if (!flag || flag === 'toChild') {
            if (this.gridData[i].PID === obj.ID) {
              this.gridData[i][field] = obj[field];
              this.change(field, this.gridData[i], 'toChild');
            }
            
          }
          if (!flag || flag === 'toParent') {
            if (this.gridData[i].ID === obj.PID) {
              if (obj[field] === '1' || this.checkBrother(field, obj)) {
                this.gridData[i][field] = obj[field];
                this.change(field, this.gridData[i], 'toParent');
              }
            }
          }
        }
        if (this.childrenData[obj.ID]) {
          this.childrenData[obj.ID].forEach((item, index) => {
            item[field] = obj[field];
            this.change(field, item, 'toChild');
          });
        }
      },
      checkBrother(field, obj) {
        let flag = true;
        for (let i = 0, len = this.gridData.length; i < len; i++ ) {
          if (this.gridData[i].PID === obj.PID && this.gridData[i][field] !== obj[field]) {
            flag = false;
          }
        }
        return flag;
      },
      close() {
        this.$emit('close');
      },
      getData(){
        let params = {
          puuid: 'root',
          jsid: this.form.XH
        };
        return getPostLimitList(params).then(res => {
          if(res.status === "success"){
            for (let i = 0, len = res.data.length; i < len; i++) {
              res.data[i].LMID = res.data[i].ID;
              res.data[i].UUID = '';
              res.data[i].OPEN = false;
              res.data[i].OPEN = res.data[i].LEVEL === 1 ? true : false;
              if (res.data[i].LEVEL < 3) {
                this.gridData.push(res.data[i]);
              } else {
                if (!this.childrenData[res.data[i].PID]) {
                  this.childrenData[res.data[i].PID] = [];
                }  
                this.childrenData[res.data[i].PID].push(res.data[i]);
              }
            }
            this.baseData = res.data;
          }else{
            this.$message.error('服务器异常，请联系管理员！');
          }
        }).catch(data => {
          this.$message.error('网络连接异常，请检查网络！');
        });           
      },
      hideChildren(obj) {
        let self = this;
        obj.OPEN = false;
        let i = this.gridData.length;
        while (i--) {
          if (this.gridData[i].PID === obj.ID) {
            if (!this.childrenData[obj.ID]) {
              this.childrenData[obj.ID] = [];
            }  
            this.childrenData[obj.ID].push(this.gridData[i]);
            this.gridData.splice(i,1);
          }
        }
        if (this.childrenData[obj.ID]) {
          this.childrenData[obj.ID].reverse();
          this.childrenData[obj.ID].forEach(function (item, index) {
            self.hideChildren(item);
          });
        }
      },
      removeChildren() {

      },
      save(obj) {
        insertLimitData({limitjson: this.baseData, jsid: this.form.XH}).then(res => {
          if (res.status === 'success') {
            this.$message.success('保存成功！');
          } else {
            this.$message.error('服务器异常，请联系管理员！');
          }
        }).catch(res => {
            this.$message.error('网络连接异常，请检查网络！');
        });
      },
      showChildren(obj) {
        obj.OPEN = true;
        this.appendData(obj);
      }
    }
  }
</script>

<style scoped>
  .jsgl-doc {
    /*height: 465px;*/
    overflow: auto;
    width: 100%;
  }
  .jsgl-doc__wrap {
    margin: 0 auto;
    width: 98%;
    border: 1px solid #eaeefb;
    border-radius: 4px;
    transition: .2s;
    padding: 10px 0;
  }
  .jsgl-doc__wrap__tips {
    width: 100%;
    height: 26px;
    line-height: 26px;
  }
  .jsgl-doc__wrap__tips--text {
    padding: 5px 20px;
    color: #6495ED;
  }
  .jsgl-doc__wrap:hover {
    box-shadow:0 0 8px 0 rgba(232,237,250,.6),0 2px 4px 0 rgba(232,237,250,.5);
  }
  .jsgl-doc__wrap__form {
    margin: 10px auto;
    width: 98%;
    min-width: 530px;
  }
  .jsgl-doc__wrap__form__btn {
    text-align: center;
  }
  .jsgl-doc__level--1 {

  }
  .jsgl-doc__level--2 {
    padding-left: 20px;
  }
  .jsgl-doc__level--3 {
    padding-left: 40px;
  }
  .jsgl-doc__level--4 {
    padding-left: 60px;
  }
  .jsgl-doc__level--5 {
    padding-left: 80px;
  }
  .jsgl-doc__isleaf {
    padding-left: 22px;
  }
  .smini {
    padding: 2px;
  }
  
</style>