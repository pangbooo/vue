/*
 * @Author: 尧永中 
 * @Date: 2017-09-27 09:36:16 
 * @Last Modified by: 尧永中
 * @Last Modified time: 2017-09-28 18:28:30
 */
/* 获取本用户下的办件统计 其中包括在办，已办统计 (无参数) */
const getBjtjByUser = {
      'code': 'idt-oApp-5000',
      'message': '操作成功',
      'data': {
                  'ZBJ': '50',  //在办件总数
                  'BJJ': '100'  //办结件总数
            }
      
};
module.exports = getBjtjByUser;
