/* 表单验证库
 * @使用:  { required: true, fieldName:'电话',validator: checkMobile , trigger: 'blur' }
 * required：可不写，默认不是必须。fieldName：必填，验证时将出现在提示信息中。
 * @Author: 尧永中 
 * @Date: 2017-10-06 09:57:31 
 * @Last Modified by: 尧永中
 * @Last Modified time: 2017-10-06 16:38:13
 */
// 验证时间设置
import { IDValidator } from './IDValidator.js'

let time_long = 500;

//通过正则表达式验证，如果非正则表达式，需要自己进行实现
function checkPartten(partten, rule, value, callback) {
      if (!partten.test(value)) {
            callback(new Error('请输入有效的' + rule.fieldName));
      } else {
            callback();
      }
}
function checkRequire(rule, value, callback) {
      if (rule.required && !value) {
            return callback(new Error(rule.fieldName + '不能为空'));
      } else {
            return '0';
      }
}
/**
 * 手机号验证
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function checkMobile(rule, value, callback) {
      if (checkRequire(rule, value, callback) == 0) {
            setTimeout(() => {
                  var partten = /^1[3,4,5,7,8]\d{9}$/;
                  checkPartten(partten, rule, value, callback);
            }, time_long);
      }
};
/**
 * 邮箱验证
 * @param {*} rule 
 * @param {*} value 
 * @param {*} callback 
 */
export function checkMail(rule, value, callback) {
      if (checkRequire(rule, value, callback) == 0) {
            setTimeout(() => {
                  var myreg = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/;
                  checkPartten(myreg, rule, value, callback);
            }, time_long);
      }
};
export function checkIDCard(rule, value, callback) {
      if (checkRequire(rule, value, callback) == 0) {
            setTimeout(() => {
                  var Validator = new IDValidator();
                  var flag = Validator.isValid(value);
                  if (!flag) {
                        callback(new Error('请输入有效的' + rule.fieldName));
                  } else {
                        callback();
                  }
            }, time_long);
      }
}