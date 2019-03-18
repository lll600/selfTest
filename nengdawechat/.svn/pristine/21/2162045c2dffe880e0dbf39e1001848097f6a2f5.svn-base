<template>
  <div  class="answerList" >
    <div v-if="pageList">
      <ul class="list" v-for="(val, index) in pageList" :key='index'> 
        <li> 
        <div class="pro" @click="toDetail(val)"><div class="title-line"><h4>{{val.title}}</h4></div></div> 
          <div class="pro answer"><p>{{val.answerCount}} 个回答</p></div> 
        </li> 
      </ul> 
    </div>
      
 </div>  
</template>
<script>
export default {
    data:function() { 
        return { 
        
        
        } 
    }, 
    props:['pageList'],
    mounted(){
         console.log(33333)
    },
    methods:{
       toDetail (m) {
      if(m.flag=='0'||m.flag==2)
     {
      var url = "/pages/article/main?titleId=" + m.titleID+"&flag="+m.flag+"&authorID="+m.ID
      wx.navigateTo({url})    
       }else{
      var url = "/pages/problemDetail/main?titleId=" + m.titleID+"&flag="+m.flag+"&questionPerID="+m.ID
      wx.navigateTo({url})
     }
   } ,
    }

  
}
</script>
<style lang="scss">
   .answerList li{
      padding-top: 0.15rem;
    }
   .answerList .pro{
	   .title-line{
		   overflow:hidden;
            text-overflow:ellipsis; 
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
	   }
	   h4{
       color: #383831;
       word-wrap: break-word;
       font-size:32rpx;
        font-family:'Helvetica Neue';
        font-weight:bold;
        margin-bottom: 5px;

	   }
      p{
        color:#949494;
      font-size: 0.22rem;
      }
      
    }
    .answerList .answer{
      padding-bottom: 0.2rem;
    }
</style>