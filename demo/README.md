# demo

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


之前不曾这样用过的:用伪元素清楚浮动(常用一个空标签来清除浮动)
ul{
    li{
        float:left;
    }
    &:before, &:after{
      content:'';
      display:table;
    }
    &:after{
        clear:both;
    }
}

在一个新的项目里,需要影响全局的样式可以写在app.vue中

在路由里不想每次都写require()来引入路径,可以写一个新的文件,
module.exports = file => () => import('@/views/' + file + '.vue')

自定义指令,自定义过滤器:
//自定义过滤器:翻译
import { translate } from '@/common/common.js'
Vue.filter('translate',function(val){
    return translate(val);
})
表示在页面上:{{需要翻译的 | translate}}

//自定义指令 把某一块固定在一个地方
Vue.directive('positionFixed', {
    inserted: function (el) {

    }
})
使用的时候:<div v-positionFixed></div>

非父子组件通信:(不使用vuex)
需要全局在入口文件中引入:
export const vue = new Vue({
    el: '#app',
    router,
    render: h => h(App),
    data:{
        Bus: new Vue()
    }
})
使用时:
this.$root.Bus.$emit("name",value)
this.$root.Bus.$on("name",value=>{

})
this.$root.Bus.$off("name")

公共方法一般写在common.js里

router-view 是包含在父的路由里的子路由的页面
<div class="second-nav">
    <router-link to="/dataContent/dataDetail/visitTotal" active-class="active" index=0>访问统计</router-link>
    <router-link to="/dataContent/dataDetail/businessTotal" index=1>商家统计</router-link>
</div>
<div class="view">
    <router-view></router-view>
</div>

router-view里放的是router-link中to属性的页面
刷新页面会停留在当前页面
如果不用的话,刷新会默认初始化的那页,不会保留刷新之前的记录.

对暂无数据和加载中的提醒,把条件判断做好会有多种方法,写一个空元素表示加载中,一个新的标志符判断,一开始就出现的解决方法:可以在根元素上用v-if判断.

获取dom元素:有时会报错,...of undefined  ,记得获取的时候做个判断(有的时候需要用document.getElementsByClassName("noBorder")[0]这种做判断)
if(document.getElementById("node")){
    console.log(document.getElementById("node").getBoundingClientRect().width)
}

a元素点过之后会有虚线border ,可以使用a{
    outline:none;
}
或者写onfocus="this.blur();"

beforeRouteEnter和watch
watch:{
    $route:{
        handler(to) {
        if (this.detail) {
          this.changeAddress();
        }
      },
      immediate: true
    }
}

if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)){
    window.location.href = shareUrl + "ProblemDetail?titleId="+this.$route.params.titleId+"&flag=1&questionPerID="+this.$route.params.authorId
}

setTimeout(function(){
    document.documentElement.scrollTop=0;document.body.scrollTop=0;
},0);  //setTimeout有时只是起了暂缓作用


网站性能优化:http://www.ruanyifeng.com/blog/2015/09/web-page-performance-in-depth.html(阮一峰)


