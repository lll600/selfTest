<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="less">
@import "./assets/icon/iconfont.css";
</style>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*, :after, :before{
  box-sizing: border-box;
}
:after{
  clear: both;
}
body{
  padding: 0;
  margin:0;
  height: 100%;
  color: #333;
}
a{
  text-decoration: none;
  color: #333;
}
ul, li{
  list-style: none;
}
.iconfont{
  font-family: iconfont!important;
  font-style: normal;
  font-weight: 400!important;
  -webkit-font-smoothing: antialiased;
}
</style>
