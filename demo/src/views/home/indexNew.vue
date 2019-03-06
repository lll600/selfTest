<template>
    <div class="testContainer">
        <div class="testTime"
        @mouseenter="enterResult"
        @mouseleave="leaveResult"></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            timer:null
        }
    },
    methods:{
        enterResult(){
            this.timer = setInterval(()=>{
               console.log(190);
               
            },1000)
        },
        leaveResult(){
            clearInterval(this.timer)
        }
    }
}
</script>
<style lang="less">
.testContainer{
    .testTime{
        width: 200px;
        height: 100px;
        border: 1px solid #333;
    }
}
</style>


