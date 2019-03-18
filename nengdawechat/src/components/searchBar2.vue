<template>
<div>
  <div class="NavBar-holder" :style="totalTopHeightStyles"></div>
      <div class="NavBar">
          <div class="NavBar-statusBar" :style="statusBarHeightStyles"></div>
          <div class="NavBar-titlebar" :style="titleBarHeightStyles">



        <div class="NavBar-content" >
            <div class="NavBar-left-area" v-if="firstPage">
                <div class="NavBar-left">
                    <!-- <image bindtap="backHome" class="NavBar-HomeIcon backToHome" src="/images/Home.svg"></image> -->
                </div>
            </div>
            
            <div class="NavBar-left NavBar-left-more" v-else>
                <!-- <img bindtap="handleBack" class="NavBar-BackIcon" src="/images/Back.svg">
                <image bindtap="backHome" class="NavBar-HomeIcon backToHome" src="/images/Home.svg"></image> -->
            </div>

            

            <div class="NavBar-content-title" >{{title}}</div>
        </div>
        <div class="capsule-holder"></div>
    </div>
</div>
</div>
</template>

<script>
export default {
  data:function() { 
   return { 
       windowHeight: 812,
        totalTopHeight: 68,
        statusBarHeight: 20,
        titleBarHeight: 48, 
        windowHeightStyles:{
          height:812+'px'  
        },
         totalTopHeightStyles:{
          height:68+'px'  
        },
         statusBarHeightStyles:{
          height:20+'px'  
        },
         titleBarHeightStyles:{
          height:48+'px'  
        },
   }
  },
   onLoad: function () {
 
    try {
      var systemInfo = wx.getSystemInfoSync();
      this.computeNavigateBarHeight(systemInfo);
    } catch (e) {
      // 获取系统信息失败
        this.windowHeightStyles={
          height:812+'px'  
        }
         this.totalTopHeightStyles={
          height:68+'px'  
        }
         this.statusBarHeightStyles={
          height:20+'px'  
        }
         this.titleBarHeightStyles={
          height:48+'px'  
        }
    
    }
  },
  methods:{
 computeNavigateBarHeight: function (systemInfo) {
      console.log(333444)
    let totalTopHeight = 68;
    if (/iPhone X|MI 8|PAAM00|COR-AL00/.test(systemInfo.model)) {
      totalTopHeight = 88;
    } else if (/iPhone/.test(systemInfo.model)) {
      totalTopHeight = 64;
    }
    let windowHeight = systemInfo.windowHeight, statusBarHeight = systemInfo.statusBarHeight;
    //   this.windowHeight=windowHeight,
    //   this.totalTopHeight=totalTopHeight,
    //   this.statusBarHeight=statusBarHeight,
    //   this.titleBarHeight=totalTopHeight - statusBarHeight
    console.log(windowHeight,totalTopHeight,statusBarHeight,totalTopHeight - statusBarHeight)
       this.windowHeightStyles="height:"+windowHeight+'px'
         this.totalTopHeightStyles="height:"+totalTopHeight+'px' 
         this.statusBarHeightStyles="height:"+statusBarHeight+'px'  
         this.titleBarHeightStyles="height:"+(totalTopHeight - statusBarHeight)+'px'  
  }, 
  }
// computed:{
//   totalTopHeightStyles(){
//       return styles({
//         height:totalTopHeight+'px'
//       })
//   },
//    windowHeightStyles(){
//       return styles({
//         height:windowHeight+'px'
//       })
//   },
//    statusBarHeightStyles(){
//       return styles({
//         height:statusBarHeight+'px'
//       })
//   },
//    titleBarHeightStyles(){
//       return styles({
//         height:titleBarHeight+'px'
//       })
//   },
// },
};
</script>

<style lang="scss">
.NavBar {
    position: fixed;
    top: 0;
    width: 100%;
    background: #008dd6;
    z-index: 20;
}

.NavBar-statusBar {
    width: 100%;
}

.NavBar-titlebar {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}

.capsule-holder {
    width: 100px;
    /* height: 100%; */
    background: red;
    height: 32px;
}

.NavBar-SearchBar {
    flex: 1;
    padding: 0 16px;
    overflow: hidden;
}

.NavBar-content {
    display: flex;
    flex: 1;
    margin: 0 0 0 10px;
    overflow: hidden;
}

.NavBar-left {
    width: 55px;
    height: 32px;
    border-radius: 32px;
    border: solid 1px #f6f6f6;
    text-align: center;
}

.NavBar-content-title {
    font-size: 17px;
    font-weight: 600;
    flex: 1;
    text-align: center;
    line-height: 32px;
    height: 32px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
}

.backToHome {
    height: 32px;
}

.NavBar-HomeIcon {
    width: 17px;
    height: 17px;
    margin-top: 7px;
}

.NavBar-left-area {
    width: 87px;
}

.NavBar-left-more {
    width: 87px;
    height: 32px;
    display: flex;
}

.NavBar-left-more .backToHome {
    flex: 1;
}

.NavBar-BackIcon {
    flex: 1;
    width: 9px;
    height: 16px;
    padding: 1px 0;
    margin-top: 9px;
    box-sizing: border-box;
    border-right: solid 1px #d2d2d2;
}
</style>
