<template>
  <div class="attentionTo" >
    <div class="good-expert-container" v-if="pageList.length>0">
        <div class="good-expert-title"  @click='showAttention()'>推荐关注 <img v-show='!showA' src='../../static/img/xia.png'><img v-show='showA' src='../../static/img/shang.png' ></div>
        <div class="good-expert-list" v-show="showA">
          <!-- {{experts}} -->
            <div v-for="(item,index) in experts" :key="index" class="good-expert-item" >
                 <div class="user-img1" style="position:relative" @click="toPersonal(item)" >
                     <img :src="(item.pic&&item.pic!='/forum/common/userPic.jpg')?item.pic:'../../static/img/user_pic.png'" alt="" class='userPic1' >
		                 <img v-show='item.ExpertType==1' src="../../static/img/vip.png"  alt="" class='vip2' >
		                 <img v-show='item.ExpertType==2' src="../../static/img/center.png" alt="" class='vip3' >

                 </div>
                 <p class="expert-item-name" @click="toPersonal(item)">{{item.accountnumber}}</p>
                 <p class="expert-item-introduce">{{item.introduce}}</p>
                 <div class="attention-btn" v-if="item.IsAttention==0 && item.type == 0" @click="followPeople(item,0)">关注</div>
                 <!-- <div class="attention-btn" v-if="item.IsAttention==0 && item.type == 1" @click="followPeople(item.ID)">{{'关注话题' | translate}}</div> -->
                 <div class="attention-btn" v-if="item.IsAttention==0 && item.type == 1" @click="followPeople(item,0)">关注</div>
                 <div class="no-attention-btn" v-if="item.IsAttention==1" @click="cancelCollect(item)">已关注</div>
            </div>
        </div>
    </div>
    <div v-if="pageList.length>0">
      <ul class="list" v-for="(item, index) in pageList" :key='index'> 
        <li>
          <div class="first-name" v-show="item.cfrom==2" >
          <div class="topic-container">
              <div class="topic-title">来自话题:</div>
              <div class="topic-contents">
                <span class='topicN' v-for="(item1,index1) in item.topicName.split(',')" :key="index1" @click="toTopic(item.topicID.split(',')[index1])">{{item1}}</span>
              </div>
            </div>
          </div>
          <div class="first-name">
            <div class="user-img" @click='toPersonal(item)' v-if="item.cfrom!=2">
              <img :src="(item.userPic&&item.userPic!='/forum/common/userPic.jpg')?item.userPic:'../../static/img/user_pic.png'" alt="" class='userPic' >
              <img v-if='item.grade==1' src="../../static/img/vip.png" alt="" class='vip' >
              <img v-if='item.grade==5' src="../../static/img/guanfang.png" alt="" class='vip' >
                <img v-if='item.grade==6' src="../../static/img/center.png" alt="" class='vip' >
            </div>
            <div class="user-img userImg2" v-else @click='toPersonal(item)'>
              <img :src="(item.userPic&&item.userPic!='/forum/common/userPic.jpg')?item.userPic:'../../static/img/user_pic.png'" alt="" class='userPic' >
                <img v-if='item.grade==1' src="../../static/img/vip.png" alt="" class='vip' >
              <img v-if='item.grade==5' src="../../static/img/guanfang.png" alt="" class='vip' >
                <img v-if='item.grade==6' src="../../static/img/center.png" alt="" class='vip' >
            </div>
                <p class="first-user-name" v-show="item.cfrom==2" @click="toPersonal(item)">{{item.accountnumber}}</p>
            
            <p v-show="item.cfrom==3" class="article-author" @click="toPersonal(item)">
              {{item.accountnumber}}  回答了 
            </p>
            <p v-show="item.cfrom==1&&item.flag == 1" class="article-author" @click="toPersonal(item)">
              {{item.accountnumber}}  提出了问题 
            </p>
            <p v-show="item.cfrom==1&&item.flag != 1" class="article-author" @click="toPersonal(item)">
              {{item.accountnumber}}  发布了文章 
            </p>
            <div>
            <span v-if="item.currenttime && item.cfrom!=2" class="vip-dot">·</span>
            <span v-if="item.currenttime && item.cfrom!=2">{{item.currenttime}}</span>
            </div>
          </div>
          
        <div class="art">
          <div class='articleLeft'>
              <div class="pro"><div class="title-line"><span @click="toDetail(item)" class="changeColor">{{item.title}}</span></div></div> 
              <div class="pro remark1" v-show="(item.cfrom==1&&item.flag != '1') || item.cfrom==3 || item.cfrom==2" ><p @click=" toSinglePro(item)" class="changeColor" v-html="item.remark1"></p></div> 
          </div>
          <div class="articleRight" v-if="(item.pic && item.pic!=null)&& !(item.cfrom==1&&item.flag == 1)" @click="toSinglePro(item)">
            <img :src="item.pic">
          </div>
        </div>
        <div class="operate-attention" v-show="!item.revertID&&item.flag==1"> 暂无回答 </div>
        <div class="operate-attention" :class="item.tag == '1'?'operate-attention-has':'operate-attention-no'" v-show="item.revertID||item.flag!=1">
            <div v-if="item.tag == '1'" class="first-width"> 此问题来源于能答网设备平台 </div>
            <div class="second-width">
                <p class="marRight" >
                  <span class='spanPad' @click="toAnswer(item)">{{item.revertCount?item.revertCount:0}}  评论 </span >·
                  <span class='spanPad'>{{item.supportCounts?item.supportCounts:0}}  赞 </span>
                </p>
            </div>
            
          </div> 
        </li> 
      </ul>
    </div>
   <div  class="no-attention-one">
     <div class="null-data">
        <img src="../../static/img/nullicon.png" alt="">
      <div class="have-no-attention"> 你还没有任何关注 </div>
     </div>
     <div class="have-attention-container">
       <div class="have-attention-title"> 大家都在关注 </div>
       <div class="have-attention-item">
         <div v-for="(item,index) in experts" :key="index" class="have-attention-items">
         <div class="have-attention-item-first">
           <div class="have-img" style="position:relative">
              <img :src="(item.pic&&item.pic!='/forum/common/userPic.jpg')?item.pic:'../../static/img/user_pic.png'" alt="" class='userPic1' >
		          <img v-show='item.ExpertType==1' src="../../static/img/vip.png" alt="" class='vip2' >
		          <img v-show='item.ExpertType==2' src="../../static/img/center.png" alt="" class='vip3' >
            </div>
           <div class="have-experts-people">
             <p class="have-experts-people-name">{{item.accountnumber}}</p>
             <p class="have-experts-people-project"><span v-if="item.type==1" style="color:#ccc;"> 话题#  </span>{{item.introduce?item.introduce:'暂无'}}</p>
           </div>
         </div>
         <div class="attention-btns" @click="followPeople(item,1)" v-if="item.IsAttention==0"> 关注 </div>
         <div class="no-attention-btns" v-else @click="cancelCollect(item)"> 已关注 </div>
       </div>
       </div>
     </div>
   </div>
 </div> 
</template>
<script>
 import { goodTime} from '../common.js';
// import { MessageBox } from 'mint-ui';
export default {
    data:function() { 
        return { 
         showA:false,
        
        } 
    }, 
    props:['pageList','experts'],
    mounted(){
         console.log(this.experts)
         for(var i in this.pageList){
          this.pageList[i].currenttime= goodTime(this.pageList[i].currenttime)
         }
    },
    methods:{
      followPeople(){
          this.$emit('showModal2',true);
      },
       showAttention(){
          this.showA=!this.showA
    },
    }
 
}
</script>
<style lang="scss" >
    .attentionTo{
      font-size: 28rpx;
      .no-attention-one{
        .null-data{
          text-align: center;
          padding: 1rem 0;
          img{
            width: 180rpx;
            height:180rpx;
          }
        }
        .userPic1{
            width: 0.88rem;
            height: 0.88rem;
            border-radius: 50%;
            margin-top: 0.2rem;
        }
        .vip2{
            width: 0.25rem;
            height: 0.25rem;
            position: absolute;
            top: 0.74rem;
            left: 0.56rem;
        }
        .vip3{
            width: 0.32rem;
            height: 0.32rem;
            position: absolute;
            top: 0.74rem;
            left: 0.56rem;
        }
        .have-no-attention{
          margin-top: 0.2rem;
          font-size: 0.3rem;
          // height: 3.5rem;
        }
        .have-attention-container{
          background: #fff;
          .have-attention-title{
            font-size: 0.3rem;
            font-weight: bold;
            padding: 0.3rem 0;
            margin: 0 0.2rem;
            border-bottom: 0.02rem solid #ccc;
          }
          .have-attention-item{
            margin: 0 0.2rem 0.2rem;
            .have-attention-items{
              height: 1.4rem;
              display: flex;
              justify-content: space-between;
               border-bottom: 0.02rem solid #ccc;
            }
            .attention-btns{
              width: 1.2rem;
              border: 0.01rem solid #fb9000;
              color: #fb9000;
              height: 0.55rem;
              border-radius: 0.1rem;
              margin-top: 0.45rem;
              text-align: center;
              line-height: 0.55rem;
              font-size: 32rpx;
            }
            .no-attention-btns{
              width: 1.2rem;
              border: 0.01rem solid #ccc;
              color: #ccc;
              height: 0.55rem;
              border-radius: 0.1rem;
              margin-top: 0.45rem;
              text-align: center;
              line-height: 0.55rem;
            }
            .have-attention-item-first{
              display: flex;
              justify-content: flex-start;
              .have-img{
                margin-right: 0.2rem;
              }
              .have-experts-people{
                width: 4rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 28rpx;
                .have-experts-people-name{
                   margin-top: 0.3rem;
                   margin-bottom: 0.05rem;
                   font-weight: bold;
                }
                .have-experts-people-project{
                  width: 100%;
                   white-space: nowrap;
                  overflow: hidden;
                  text-overflow: ellipsis;
                }
              }
            }
          }
        }
      }
    .good-expert-container{
        // height: 3.9rem;
        background: #fff;
        margin-top: 0.1rem;
        .userPic1{
            width: 0.88rem;
            height: 0.88rem;
            border-radius: 50%;
        }
        .vip2{
            width: 0.25rem;
            height: 0.25rem;
            position: absolute;
            top: 0.54rem;
            right: 0.8rem;
        }
        .vip3{
            width: 0.32rem;
            height: 0.32rem;
            position: absolute;
            top: 0.54rem;
            right: 0.8rem;
        }
        // .good-expert-null{
        //     width: 100%;
        //     height: 0.2rem;
        //     background: #eee;
        //     position: fixed;
        //     top: 1.5rem;
        //     z-index: 10;
        // }
        .good-expert-title{
            height: 0.5rem;
            line-height: 0.5rem;
            font-size: 0.3rem;
            font-weight: bold;
            padding-left: 3%;
            padding-top: 0.1rem;
            img{
              width: 0.3rem;
              height:0.3rem;
              float: right;
              padding-right: 0.2rem;
              margin-top: 0.1rem;
            }
        }
        .good-expert-list{
            // height: 2.9rem;
            overflow-x: auto !important;
            white-space: nowrap;
            padding-top: 0.2rem;
            padding-bottom: 0.2rem;
            padding-left: 3%;
            padding-right: 3%;
            .good-expert-title{
                font-size: 0.28rem;
            }
           .good-expert-item{
               display: inline-block;
               width: 32%;
                height: 2.9rem;
               text-align: center;
               box-sizing: border-box;
               margin-right: 2%;
               padding-top: 0.2rem;
               padding-bottom: 0.2rem;
               -moz-box-shadow: 1px 1px 3px rgba(0,0,0,.1),-1px -1px 3px rgba(0,0,0,.1);
                -webkit-box-shadow: 1px 1px 3px rgba(0,0,0,.1),-1px -1px 3px rgba(0,0,0,.1);
                box-shadow: 1px 1px 3px rgba(0,0,0,.1), -1px -1px 3px rgba(0,0,0,.1);
                p{
                    height: 0.4rem;
                    line-height: 0.4rem;
                    padding: 0 0.2rem;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }
                .expert-item-name{
                    font-size: 0.26rem;
                    font-weight: bold;
                    margin-bottom: 0.02rem;
                }
                .expert-item-introduce{
                    color: #999;
                    font-size: 0.24rem;
                    margin-bottom: 0.16rem;
                }
               .expert-img{
                   img{
                       width: 50%;
                   }
               }
               .attention-btn{
                   width: 47%;
                   margin: 0 auto;
                   padding: 0.08rem;
                   border: 0.01rem solid #fb9000;
                   border-radius: 0.08rem;
                   background-color: #fb9000;
                   color: #fff;
               }
               .attention-btn-topic{
                   width: 47%;
                   margin: 0 auto;
                   padding: 0.08rem;
                   border: 0.01rem solid #fb9000;
                   border-radius: 0.08rem;
                   background-color: #fb9000;
                   color: #fff;
               }
               .no-attention-btn{
                   width: 54%;
                   margin: 0 auto;
                   padding: 0.08rem;
                   border: 0.01rem solid #ccc;
                   background-color: #ccc;
                   color: #fff;
                   border-radius: 0.08rem;
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
        box-shadow: #7c7c7c;
        // width: 100%;
		// max-height: 2.88rem;
    	box-sizing: border-box;
      	.delete-div{
          	padding-top: 0.1rem;
          	display: flex;
          	align-items: center;
          	justify-content: space-between;
          }
          .first-name{
            text-transform: lowercase;
            display: flex;
            justify-content: flex-start;
            height: 0.6rem;
            line-height: 0.6rem;
            margin-bottom: 0.2rem;
            color: rgb(119, 118, 118);
            .userImg2{
              // display: flex;
              // min-width: 20%;
            }
            .user-img{
              float: left;
              width: 9%;
              height: 0.58rem;
              line-height: 0.58rem;
              margin-right: 1%;
              position: relative;
                  .userPic{
                    width: 0.58rem;
                height: 0.58rem;
                border-radius: 50%;
                    margin-right: 0.2rem;
              }
              .vip{
                  width: 0.25rem;
                  height: 0.25rem;
                  position: absolute;
                  top: 0.34rem;
                  left: 0.42rem;
              }
            }
            .first-user-name{
              margin-right: 5px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
            .topic-container{
              width: 100%;
              font-size: 0.28rem;
              display: flex;
              justify-content: flex-start;
              .topic-title{
                margin-right: 2%;
                // vertical-align: top;
              }
              .topic-contents{
                // width: 70%;
                flex: 1;
                white-space: nowrap;
                overflow: scroll;
                -webkit-overflow-scrolling:touch;
                .topicN{
                  padding: 0.1rem 0.2rem;
                  margin-right: 0.15rem;
                  border-radius: 0.4rem;
                  background: #f3f3f3;
                  color: #333;
                }
              }
              ::-webkit-scrollbar {
                  display: none;
                  
                  /* 或者这样
                  width: 0;
                  height: 0;
                  */
              }
            }
              .article-author{
                // padding: 0.2rem 0;
                font-size: 0.26rem;
              }
              .vip-dot{
                margin-left: 0.1rem;
              }
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
      .operate-attention{
        display: flex;
        justify-content:space-between;
        align-items: center;
        margin-top: 0.15rem;
        padding-bottom: 0.2rem;
        height: 0.58rem;
        color: #929292;
        // padding-right: 0.5rem;
         i{
          margin-right: 0.1rem;
         }
         .first-width{
           width: 56%;
         }
         .second-width{
           width: 48%;
           display: flex;
           justify-content: flex-end;
         }
      }
      .operate-attention-has{
        
      }
      .operate-attention-no{
        justify-content:flex-end;
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
      overflow: hidden;
      flex: 1;
      //  width:100%;
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
}
    .orange:before{
    color:#fe9500
    }
</style>