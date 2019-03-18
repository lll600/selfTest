<template>
  <div  class="articleList" >
    <div v-if="pageList">
      <ul class="list" v-for="(item, index) in pageList" :key='index' > 
          <li >
        <div class="delete-div" v-if="isShowDelete">
          <span></span>
          <span class="icon-close" @click="$emit('updateCollect',item.flag=='0'?item.titleID:item.revertID,item.flag=='0'?'2':'5')"></span>
        </div>
      <div class="art">
        <div class='articleLeft'>
            <div class="pro"><div class="title-line"><span @click="toDetail(item)" class="changeColor">{{item.title}}</span></div></div> 
            <div class="pro remark1"><p @click=" toSinglePro(item)" class="changeColor" v-html="item.remark1"></p></div> 
        </div>
        <div class="articleRight" v-if="item.pic&&item.pic!='null'" @click=" toSinglePro(item)">
          <img :src="item.pic" >
        </div>
      </div>
      <div class="operate" v-if="!item.revertID&&item.flag==1">暂无回答</div>
        <div class="operate" v-if="item.revertID||item.flag!=1">
        <div class=" user" v-if="item.revertIsAnon=='True'||item.revertIsAnon==true||item.revertIsAnon==1" >
      <div class="user-img">
        <img src="../../static/img/user_pic.png" alt="" class='userPic' >
      </div>
      <div class="user-name" >
        <span >{{'匿名用户'}}</span>
      </div>
        </div>
      <div class=" user" @click='toPersonal(item)' v-else>
      <div class="user-img" style="position:relative">
        <img :src="(item.userPic&&item.userPic!='/forum/common/userPic.jpg')?item.userPic:'../../static/img/user_pic.png'" alt="" class='userPic' >
          <img v-if='item.grade==1' src="../../static/img/vip.png" alt="" class='vip' >
            <img v-if='item.grade==5' src="../../static/img/guanfang.png" alt="" class='vip' >
              <img v-if='item.grade==6' src="../../static/img/center.png" alt="" class='vip' >
          <!-- <i class="vipImg"></i> -->
      </div>
      <div class="user-name">
        <span class="user-name-style">{{item.accountnumber}}</span>
      </div>
        </div>
          <p class="marRight" >
            <!-- <i class="icon-pl "></i> -->
            <span class='spanPad' @click=" toSinglePro(item)">{{item.revertCount?item.revertCount:0}} {{'评论'}}</span >·
    
            <!-- <i class="icon-dz" :class="item.IsSupport==1?'orange':''"></i> -->
            <span class='spanPad' @click=" toSinglePro(item)">{{item.supportCounts?item.supportCounts:0}} {{'赞'}}</span></p>
        </div> 
      <!-- <div class="pro user"><img :src="item.userPic" alt="" class='userPic'><span>{{item.accountnumber}}</span><i class="icon-zkjt"></i></div> 
      <div class="pro"><h4 @click="toDetail(item)">{{item.title}}</h4></div> 
        <div class="pro remark1"><p @click="toSinglePro(item)">{{item.remark1}}</p></div> 
          <div class="operate"><p><i class="icon-zf "></i>{{item.Isrecommend}}</p>
          <p  @click="toAllAnswer(item)"><i class="icon-pl "></i>{{item.revertCount}}</p>
          <p><i class="icon-dz"></i>{{item.supportCounts}}</p></div>  -->
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
         console.log(this.pageList)
    },
    methods:{
      toPersonal(m){
          if(m.flag=='0')
      {
         var url = "/pages/mine/main?userID=" + m.ID
          wx.navigateTo({url})
      }else if(m.flag=='6'){
        var url = "/pages/mine/main?userID=" + m.operatorID
       wx.navigateTo({url})
      }else if(!m.flag){
        var url = "/pages/mine/main?userID=" + m.ID
           wx.navigateTo({url})
      }else{
          var url = "/pages/mine/main?userID=" + m.userID
           wx.navigateTo({url})
      }
      },
    toSinglePro(m) {
     if(m.flag=='0'||m.flag==2)
    {
        var url = "/pages/article/main?titleId=" + m.titleID+"&flag="+m.flag+"&authorID="+m.ID
      wx.navigateTo({url})
    }else{
      var url = "/pages/singleAnswer/main?titleId=" + m.titleID+"&flag="+m.flag+"&authorID="+m.userID+"&revertID="+m.revertID+"&questionPerID="+m.ID
      wx.navigateTo({url})
    }
   } ,
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
     .articleList{
      //  .vipImg{
      //     background: url('../../../static/images/VIP.svg');
      //     height:70px;
      //     width:70px;
      //     background-size: 70px 70px;
      //     display: inline-block;
      //   }
      .has-nodata{
        text-align: center;
        padding-top: 50%;
        font-size: 0.3rem;
        .has-nodata-img{
          width: 26%;
          padding-bottom: 0.4rem;
        }
      }
      .user-img-container{
        height: 1.7rem;
        .userPic1{
            width: 0.88rem;
            height: 0.88rem;
            border-radius: 50%;
        }
       
        .vip1{
            width: 0.25rem;
            height: 0.25rem;
            position: absolute;
            top: 0.54rem;
            right: 0.28rem;
        }
        .vip3{
            width: 0.32rem;
            height: 0.32rem;
            position: absolute;
            top: 0.54rem;
            right: 0.28rem;
        }
        .user-img-list{
            background: #f5f5f5;
            width: 100%;
            height: 1.5rem;
            white-space: nowrap;
            overflow-x: auto !important;
            padding-top: 0.2rem;
            // padding-bottom: 0.1rem;
            .user-img-item{
                display: inline-block;
                text-align: center;
                width: 18%;
                p{
                    width: 90%;
                    margin: 0 auto;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
            }
        }
    }
      .vip{
           width: 0.25rem;
          height: 0.25rem;
          position: absolute;
          top: 0.34rem;
          left: 0.42rem;
      }
    }
    .list{
      border-bottom: 1px solid #eaeaea;
      .spanPad{
        padding-right: 5px;
      }
        .introduce{
           display: flex;
           justify-content: space-between;
           align-items: center;
           padding: 0.2rem;
           width:100%;
           height: 1.14rem;
           box-sizing: border-box;
           border-bottom: 1px solid #eaeaea;
            .isSave{
           color: #99999a;
            border: 0.02rem solid #99999a;
            border-radius: 0.1rem;
              padding:5px;
               .icon-gzwt:before{
               color: #99999a
           }
       }
       .noSave{
            color: #ee781b;
             border: 0.02rem solid #ee781b;
             border-radius: 0.1rem;
             padding:5px;
             .icon-gzwt:before{
               color: #ee781b
           }
       }
          //  border-bottom: 5px solid #eaeaea;
           .introduceLeft{
			        width: 80%;
               display: inline-flex;
            //    justify-content: center;
               align-items: center;
               h5{
                 font-size: 0.28rem;
               }
               span{
                   font-size: 0.26rem;
                   color: #99999a;
                   overflow:hidden;
          	       text-overflow:ellipsis; 
                   display: -webkit-box;
                   -webkit-box-orient: vertical;
        		      -webkit-line-clamp: 1;
               }
           }
           img{
               width:0.9rem;
               height: 0.9rem;
               margin-right: 0.2rem;
               border-radius: 50%;
           }
       }
       .attentionCount{
         font-size: 0.24rem;
         color: #99999a;
         padding-left:0.2rem;
         height: 0.54rem;
         line-height: 0.54rem;
       }
      li{
        background: white;
        margin-top:0.12rem;
        padding-left: 0.2rem;
        padding-right: 0.2rem;
        padding-top: 0.2rem;
        margin-left: 0.08rem;
        margin-right: 0.08rem;
        border-radius:0.06rem; 
        // width: 100%;
        box-shadow: #7c7c7c;
		// max-height: 2.88rem;
    	box-sizing: border-box;
      	.delete-div{
          	padding-top: 0.1rem;
          	display: flex;
          	align-items: center;
          	justify-content: space-between;
        	}
      	}
      	.pro{
         	// padding-top: 0.2rem;
        	// display: flex;
        	.icon-zkjt {
          		float: right;
          		padding-top: 0.1rem;
          		font-size: 0.24rem;
			}
			.title-line{
				overflow:hidden;
            	text-overflow:ellipsis; 
            	display: -webkit-box;
            	-webkit-box-orient: vertical;
            	-webkit-line-clamp: 2;
			}
			span{
        font-size: 0.32rem;
        font-family:'Helvetica Neue';
        font-weight:bold;
        // width:100%;
        word-wrap: break-word;
			}
      	}
      	.user{
		// padding-bottom: 10px;
			.user-img{
				float: left;
				height: 0.58rem;
				line-height: 0.58rem;
        		.userPic{
        			width: 0.58rem;
					height: 0.58rem;
					border-radius: 50%;
        			margin-right: 0.2rem;
				}
			}
			.user-name{
          font-size: 0.28rem;
        //   padding-top: 0.04rem;
				  float: left;
				  width: 2rem;
			}
      	}
       .marRight{
		  //  background-color: #eaeaea;
    	// 	border-radius: 0.1rem;
        padding-left: 0.1rem;
        padding-right: 0.1rem;
        padding-top: 0.05rem;
         padding-bottom: 0.01rem;
    		// margin-left: 1.6rem;
    		// margin-right: 0.2rem;
         	// margin-left: 2rem;
            font-size: 0.28rem;

         
        }
      .operate{
        display: flex;
        justify-content:space-between;
        align-items: center;
        margin-top: 0.15rem;
        padding-bottom: 0.2rem;
        height: 0.58rem;
	    	color: #929292;
         i{
          margin-right: 0.1rem;
		 }
      }
      .iconFont{
		font-size: 0.28rem;
		background-color: #eaeaea;
    	border-radius: 0.1rem;
      padding-left: 0.1rem;
      padding-right: 0.1rem;
          padding-top: 0.05rem;
         padding-bottom: 0.01rem;
   
      }

      .remark1{
        font-size: 0.3rem;
        margin-top: 0.1rem;
        p{
			color: #636363;
          	overflow:hidden;
          	text-overflow:ellipsis; 
            display: -webkit-box;
            -webkit-box-orient: vertical;
          -webkit-line-clamp: 3;
          word-wrap: break-word;
        }
      }
    }
    .art{
      width:100%;
      // height:2.2rem; 
      display: flex;
      justify-content: space-between;
      // align-items: center;
    }
    .articleLeft{
      flex: 1;
       width:100%;
	  // height: 100%;
	  // padding-right: 0.26rem;
    //      text-overflow: ellipsis;
    //   display: -webkit-box; /** 对象作为伸缩盒子模型显示 **/
    //   -webkit-box-orient: vertical; /** 设置或检索伸缩盒对象的子元素的排列方式 **/
    //   -webkit-line-clamp: 4; /** 显示的行数 **/
    //   overflow: hidden;  /** 隐藏超出的内容 **/

    }
    .articleRight{
		width: 2.1rem;
      height: 2.1rem;
      margin-left: 0.2rem;
      // padding-top: 0.22rem;
      // padding-bottom: 0.22rem;
    //   width:100px;
    //   height:1.6rem;
      img{
        width:100%;
		    height:100%;
		    border-radius: 0.1rem;
      }
	}
	.user {
    display: flex;
    /* justify-content: center; */
    align-items: center;
    height: 100%;
    width: 3rem;
    .user-name{
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
}
    .orange:before{
    color:#fe9500
    }
</style>