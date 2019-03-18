import Vue from 'vue'
import App from './App'
import { MD5} from '@/common.js';
// import

Vue.config.productionTip = false
App.mpType = 'app'

var Fly=require("flyio/dist/npm/wx")
var fly=new Fly
fly.config.timeout=15 * 1000
fly.config.baseURL="https://www.nengda.org:4753/api/"

var fly1 = new Fly()
fly1.config.timeout=15 * 1000
fly1.config.baseURL="https://www.nengda.org:4753/api/"
//添加响应拦截器

//添加请求拦截器
fly.interceptors.request.use((config)=>{

  config.headers['translateType'] = 'en';
  config.headers['is_app'] = true
  config.headers['user_id'] = 0;
  let time = new Date().getTime()
  let random = parseInt(Math.random()*1000000);
  if(wx.getStorageSync('token')){
      console.log(1111)
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';  
    config.headers['token'] = wx.getStorageSync('token');
    config.headers['nonce'] = random;
    // config.headers['timestamp'] = new Date().getTime(); 
    // config.headers['signature'] =MD5(''+new Date().getTime()+random+localStorage.getItem('token'));
    config.headers['timestamp'] = time; 
    config.headers['signature'] =MD5(''+time+random+wx.getStorageSync('token'));  
  }else{
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded';  
  }
  //在请求发出之前进行一些操作
  // if(vue.Cookie.get('ticket')==undefined){
  //     vue.$router.push('/login');
  // }
  // config.data = Qs.stringify(config.data);
  return config;
});
fly1.interceptors.request.use((request)=>{
  //给所有请求添加自定义header
  // request.headers["X-Tag"]="flyio";
    //打印出请求体
    // console.log(request.body)
    //终止请求
    //var err=new Error("xxx")
    //err.request=request
    //return Promise.reject(new Error(""))

  //可以显式返回request, 也可以不返回，没有返回值时拦截器中默认返回request
  return request;
})

Vue.prototype.$http = fly;
Vue.prototype.$http2 = fly1;

const app = new Vue(App)
app.$mount()
// var Fly=require("flyio/dist/npm/wx")
// Vue.prototype.$http = axios;
//  Vue.prototype.$http2 = instance;

export default {
  // 这个字段走 app.json
  config: {
    // 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
    pages: ['^pages/index/main'],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTextStyle: 'black',
      enablePullDownRefresh: true,
      navigationStyle: "custom",
      
    },
    // tabBar:{
    //   color: "#cfcfcf",
    //   backgroundColor:"#fff",
    //   borderStyle: "1px solid #cfcfcf",
    //   selectedColor: "#66C3AA",
    //   list:[
    //     {
    //       pagePath:"pages/index/main",
    //       text:"首页",
    //       iconPath:"/static/img/menu/index.png",
    //       selectedIconPath:"/static/img/menu/indexSelect.png"
    //     },
    //     {
    //       pagePath: "pages/message/main",
    //       text: "消息",
    //       iconPath:"/static/img/menu/classification.png",
    //       selectedIconPath:"/static/img/menu/classificationSelect.png"
    //     },
    //     {
    //       pagePath: "pages/mine/main",
    //       text: "我",
    //       iconPath:"/static/img/menu/personalCenter.png",
    //       selectedIconPath:"/static/img/menu/personalCenterSelect.png"
    //     }
    //   ]
    // }
    
  }
}
