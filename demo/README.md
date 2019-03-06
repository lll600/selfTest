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

git提交到github上:

一个弹框的关闭效果:根元素写个点击事件:
<div class="customer-contain" @click="hideEmoji"></div>
    hideEmoji() {
      if (this.emojiShow) {
        this.emojiShow = false;
      }
    },

子组件中写的方法,父组件可以通过ref直接调用:
this.$refs.showImg.indexFn(childIndex);

监听元素尺寸的变化:https://juejin.im/post/5b4f0c56e51d4518ef2cda0f(使用ResizeObserver)
函数节流:https://blog.csdn.net/ruby_xc/article/details/81080918
        https://www.npmjs.com/package/throttle-debounce(安装)

element 跑马灯源代码学到的:
1.es6的filter():https://blog.csdn.net/bossxu_/article/details/80756563
  this.items = this.$children.filter(child => child.$options.name === 'ElCarouselItem');
  filter参数:http://www.cnblogs.com/echolun/p/8530984.html
  var arr = [1, 2, 2, 3, 4, 5, 5, 6, 7, 7,8,8,0,8,6,3,4,56,2];
    var arr2 = arr.filter(
        (x, index,self)=>{
            x:值每一项的值
            index:每一项的下标
            self:要过滤的原数组
            console.log(x,'kkkkk');
            console.log(index,'22222');
            console.log(self,'jjjjj');
            
            self.indexOf(x)===index
        }
    )

2.this.$el:指页面上的dom元素,不能写在created里,因为此时dom树还未渲染成功
<div class="test">
  <span></span>
</div>
mounted(){
    this.$nextTick(()=>{
        console.log(this.$el) // <div class="test"><span></span></div>
    })
} 
和定时器的区别:https://www.jb51.net/article/57882.htm            ????

3.计算属性:computed:https://www.w3cplus.com/vue/vue-computed-intro.html 
                 https://blog.csdn.net/yangkaige111/article/details/80574858

4.数组的some()方法:http://www.runoob.com/jsref/jsref-some.html

5.element样式没有出来:因为样式文件没被引入:
全局引入element:
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';//不能忘记引入
Vue.use(ElementUI);
tips:导致自己弄了两天也没效果

6.函数节流和防抖动:throttle-debounce  https://juejin.im/post/5b88a54751882542ea13d253

7.用npm安装一个模块throttle-debounce,引用时一直在报错:"export 'default' (imported as 'throttle') was not found in 'throttle-debounce'
引用在需要的页面: import throttle from 'throttle-debounce';一直在报上面的错误.
正确的引用:import { throttle } from 'throttle-debounce'
两者区别:https://www.cnblogs.com/mei1234/p/9151922.html
具体了解就看es6语法问题.

8.父子组件中$parent和$children

9.父组件的created > 父组件的computed > 子组件调用父组件的方法 > 父组件的mounted

10.箭头函数:不同表示方法不同的写法
https://blog.csdn.net/zgrkaka/article/details/76836759
tips:加不加函数体有时候很重要!!!

11.子组件调用父组件的方法:this.$parent.updateItems()
   父组件调用子组件的方法:item.translateItem(index, this.activeIndex, oldIndex);

12.要关闭某个页面时,需要将该页面的定时器,监听器等销毁.

13.有的页面会声明name:
b.vue:  
    export default {
        name: 'ElCarouselItem',
    }

a.vue:(是b的父组件)
this.$children[0].$options.name == 'ElCarouselItem'
可以用这个判断
this.items = this.$children.filter(
    child => child.$options.name === 'ElCarouselItem'
    // child => {
    //   return child.$options.name === 'ElCarouselItem'
    // }
);
