<template>
    <div class="problemDetail">
    <search-bar></search-bar>
    <div class="container"> 
 <scroll-view  :scroll-top="scrollTop" scroll-y="true" :style="scrollHeightStyle"
 class="list" bindscrolltolower="bindDownLoad" bindscroll="scroll" bindscrolltoupper="refresh"> 
 <div class="item" v-for="(item,index) in list" :key="index"> 
  <img class="img" src="https://cdn.kuaidi100.com/images/all/56/zhongtong.png">
  <div class="text"> 
    <div class="pro remark1"><p @click=" toSinglePro(item)" class="changeColor" v-html="item.remark1"></p></div> 

  </div> 
 </div> 
 </scroll-view> 
 <div class="body-div"> 
 <loading :hidden="hidden" bindchange="loadingChange"> 
  加载中... 
 </loading> 
 </div> 
</div>
 
      
    </div>
</template>
<script>
  import searchBar from "@/components/searchBar";
export default {
    data(){
         return {
           hidden: true, 
            list: [], 
            scrollTop: 0, 
            scrollHeight: 0,
            url:"http://192.168.30.4:8080/gtxcx/carrier/getCarrier.action",
            page:1,
            scrollHeightStyle:''

         }
    },
     components: { 
        "search-bar": searchBar,
      
  //  'v-loadmore':Loadmore // 为组件起别名，vue转换template标签时不会区分大小写，例如：loadMore这种标签转换完就会变成loadmore，容易出现一些匹配问题 
               // 推荐应用组件时用a-b形式起名 
  }, 
    methods:{
         bindDownLoad: function () { 
 var that = this; 
 this.GetList(that); 
 }, 
 scroll: function (event) { 
 this.setData({ 
  scrollTop: event.detail.scrollTop 
 }); 
 }, 
 refresh: function (event) { 
 page = 1; 
 this.setData({ 
  list: [], 
  scrollTop: 0 
 }); 
 this.GetList(this) 
 }, 
 GetList(that) { 
 
 this.hidden=false
   this.$http.get('/ForumList/ProblemList',{
            type: 0,
          ID: 191,
          pageNow: this.page,
          pageSize: 20
            }).then(response => {
              
          if (this.list != "" && this.page != 1) {
            this.list = this.pageList.concat(response.data.result);
          } else {
            this.list = response.data.result;
 
          }
          this.page++; 
  
  this.hidden= true
        })
        .catch(error => {});


//  wx.request({ 
//  url: this.url, 
//  data: { 
//   pageSize: 10, 
//   pageNo: this.page 
//  }, 
//  success: function (res) { 
//   var l = that.data.list 
//   for (var i = 0; i < res.data.length; i++) { 
//   l.push(res.data[i]) 
//   } 

//   this.list=l 

//   this.page++; 
  
//   this.hidden= true
//  } 
//  }); 
}

    },
    onLoad: function () { 
 var that = this; 
 wx.getSystemInfo({ 
  success: (res)=> { 
  console.info(res.windowHeight); 
 
   this.scrollHeight= res.windowHeight 
   this.scrollHeightStyle='height:'+this.scrollHeight+'px'
 
  } 
 }); 
 }, 
 onShow: function () { 
 var that = this; 
 this.GetList(that); 
 }, 

//  onPullDownRefresh: function () { 
//  console.log("下拉") 
//  }, 
//  onReachBottom: function () { 
//  console.log("上拉"); 
//  } 

}
</script>
<style lang="scss" >
    // @import '../../style/common.less';
.problemDetail{
    //     position: absolute;
    // top:52px;
   .container{ 
//    .list{
//     //    height: 80vh;
    
//    }
 height: 100%; 
 padding: 20rpx; 
} 
  
.item{ 
 display: flex; 
 margin-bottom: 50rpx; 
width:100%; 
background:#f0f0f0; 
overflow:hidden; 
} 
  
.img{ 
 height: 100rpx; 
 width: 100rpx; 
 border-radius: 50%; 
} 
  
.text{ 
 display: flex; 
 flex-shrink:1; 
 flex-grow:1; 
 padding: 10rpx; 
 flex-wrap: wrap; 
 font-size: 50rpx; 
} 
  
.title{ 
 font-size: 50rpx; 
 margin:10rpx 100rpx 10rpx 100rpx; 
} 
.description{ 
 font-size: 50rpx; 
 align-self:flex-end; 
}

        
    }
</style>


