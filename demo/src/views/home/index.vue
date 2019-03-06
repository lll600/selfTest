<template>
    <div>
       <carousel :interval="5000" arrow="always">
            <carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
            </carousel-item>
        </carousel>
       <div @click="$router.push('/indexNew')">测试定时器</div>
    </div>
</template>
<script>
import carousel from '@/components/main';
import carouselItem from '@/components/index';
export default {
    components:{carousel,'carousel-item':carouselItem}
}
</script>
<style lang="less">
.el-carousel__item h3 {
    color: #475669;
    font-size: 18px;
    opacity: 0.75;
    line-height: 300px;
    margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
    background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n+1) {
    background-color: #d3dce6;
  }
</style>