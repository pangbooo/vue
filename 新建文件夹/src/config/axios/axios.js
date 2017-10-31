/***
 * 对axios的基本配置，目前只增加超时时间
 * 增加对访问请求及访问返回的拦载，可定义各种异常的提示信息。
 * 以后该处需要继续扩展
 * 作者：尧永中
 * 2017-6-1
 */
import { Loading, MessageBox } from 'element-ui';
import axios from 'axios';
axios.defaults.timeout = 2000;

// axios.defaults.baseURL = '/';
axios.defaults.baseURL = 'http://199.66.68.231:28080/idtservicedev'; 
var loadinginstace;
axios.interceptors.request.use(config => {
      // element ui Loading方法
      // config.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      loadinginstace = Loading.service({ fullscreen: true });
      // alert(localStorage.getItem('idt_App_token'));
      let idtAppToken = localStorage.getItem('idt_App_token');
      if (idtAppToken) {  // 判断是否存在token，如果存在的话，则每个http header都加上token
            config.headers['token'] = idtAppToken;
      }
      if (config.url.indexOf('/oApp/login') > -1 || config.url.indexOf('/web/qyglOrYhglRegister') > -1 || config.url.indexOf('/web/webSaveForm') > -1 || config.url.indexOf('/web/webCheckCode') > -1) {
            let idtAppKey = localStorage.getItem('idt_App_key');
            if (idtAppKey) {
                  config.headers['codeKey'] = idtAppKey;
            }
      }
      return config;
}, error => {
      loadinginstace.close();
      MessageBox('加载超时!', '系统消息', {
            confirmButtonText: '确定',
            type: 'error'
      });
      return Promise.reject(error);
});

axios.interceptors.response.use(function (res) {
      // console.log(JSON.stringify(res));
      let codeArr = ['idt-oApp-3000','idt-oApp-3100','idt-oApp-3200', 'idt-oApp-3210', 'idt-oApp-5000'];
      loadinginstace.close();
      if (res.headers && res.headers.token) {
            localStorage.setItem('idt_App_token', res.headers.token);
      }
      if (res.data.status === undefined) {
            if (codeArr.indexOf(res.data.code) > -1) {
                  res.data.status = 'success';
            } else {
                  if (res.data && (res.data.code === 'idt-jwt-503' || res.data.code === 'idt-jwt-501' || res.data.code === 'idt-core-100' || res.data.code === 'idt-jwt-502')) {
                        // MessageBox('登录超时!', '系统消息', {
                        //       confirmButtonText: '确定',
                        //       type: 'error'
                        // }).then(res => {
                        //       // 进行登录页面
                        //       window.location.href = '/user/login/index.html';
                        // });
                        window.location.href = '/user/login/index.html';
                  }
                  res.data.status = 'false';
            }
      }
      return res;
}, function (error) {
      loadinginstace.close();
      if (error.response.status >= 400) {
            MessageBox('访问异常!', '系统消息', {
                  confirmButtonText: '确定',
                  type: 'error'
            });
      }
});
export default axios;
