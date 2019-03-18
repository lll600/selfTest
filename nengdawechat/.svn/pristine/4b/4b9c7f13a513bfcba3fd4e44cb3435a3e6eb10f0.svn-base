<template>
 <div class="homeContain">
  <div class="place"></div>
  <div class="homeMenu">
    <a href="/pages/index/main">
      <div class="menuTitle" :class="{menuActive: menuName == 'index'}">
        <i class="iconfont icon-home"></i>
        <span>首页</span>      
      </div>
    </a>
    <a href="/pages/message/main">
      <div class="menuTitle" :class="{menuActive: menuName == 'classification'}">
        <i class="iconfont icon-classification"></i>
        <p>消息</p>
      </div>
    </a>

    <a href="/pages/mine/main">
      <div class="menuTitle" :class="{menuActive: menuName == 'mine'}">
        <i class="iconfont icon-personal-center"></i>
        <p>我的</p>
      </div>
    </a>
  </div>
  </div>

</template>

<script>

export default {
  props: ['menuName'],
  data(){
    return{
      // url: ''
    }
  },
  created(){
  }
}
</script>

<style lang="scss">
.homeContain{
  .place{
    height: 55px;
  }
  .homeMenu {
    position: fixed;
    bottom: 0;
    height: 55px;
    width: 100%;
    background: #fff;
    border-top: 1px solid #cfcfcf;
    box-shadow: 0px 0px  5px 0px #cfcfcf;
    .menuTitle{
      width: 20%;
      float: left;
      height: 100%;
      color: #cfcfcf;
      text-align: center;
      font-size: 14px;
      margin-top:10px;
      i{
        font-size: 20px;
      }
      
    }
    .menuActive{
      color: #ee781b;
    }
  }
}
  


</style>