<template>
    <div class="home-container">
        <div class="header-limit">
            <div class="inner-box">
                 <a href="#" class="logo"><img src="//cdn2.jianshu.io/assets/web/nav-logo-4c7bbafe27adc892f3046e6978459bac.png" alt=""></a>
                 <a href="#" class="btn write-btn">
                    <i class="iconfont icon-xiezuo"></i>
                    写文章
                </a>
                <a href="#" class="btn sign-up">注册</a>
                <a href="#" class="btn log-in">登录</a>
                <div class="container">
                   <div class="collapse navbar-collapse">
                     <ul class="nav">
                         <li class="tab active">
                             <a href="#">
                                 <i class="iconfont icon-zhinanzhen-copy menu-icon"></i>
                                 <span>首页</span>
                             </a>
                        </li>
                         <li>
                             <a href="#">
                                 <i class="iconfont icon-xiazaiapp menu-icon"></i>
                                 <span>下载App</span>
                             </a>
                        </li>
                         <li></li>
                     </ul>
                   </div>
                </div>
            </div>
        </div>
        <div class="container index">
           <div class="row">
               <div class="main">
                   <div class="main-top">

                   </div>
               </div>
               <div class="aside">
                   <div></div>
                   <div></div>
                   <div></div>
               </div>
           </div>
        </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style lang="less">
.home-container{
    .header-limit{
        height: 56px;
        position: fixed;
        right: 0;
        left: 0;
        top: 0;
        z-index: 1030;
        min-height: 50px;
        margin-bottom: 20px;
        border: 1px solid transparent;
        border-width: 0 0 1;
        border-color: #f0f0f0;
        .menu-icon{
            margin-right: 5px;
            display: inherit;
            float: left;
            font-size: 20px;
        }
        .inner-box{
            min-width: 768px;
            width: 1440px;
            margin: 0 auto;
            .logo{
                float: left;
                height: 56px;
                padding: 0;
                img{
                    height: 100%;
                    vertical-align: middle;
                }
            }
            .btn{
                display: inline-block;
                font-weight: 400;
                text-align: center;
                vertical-align: middle;
                touch-action: manipulation;
                cursor: pointer;
                background-image: none;
                border: 1px solid transparent;
                white-space: nowrap;
                padding: 6px 12px;

            }
            .icon-xiezuo{
                margin-right: 3px;
                font-size: 19px;
                vertical-align: middle;
            }
            .write-btn{
                float: right;
                width: 100px;
                height: 40px;
                line-height: 24px;
                margin: 8px 15px 0;
                border-radius: 20px;
                font-size: 15px;
                color: #fff;
                background-color: #ea6f5a;
            }
            .sign-up{
                float: right;
                width: 80px;
                height: 38px;
                line-height: 24px;
                margin: 9px 5px 0 15px;
                border: 1px solid rgba(236,97,73,.7);
                border-radius: 20px;
                font-size: 15px;
                color: #ea6f5a;
                background-color: transparent;
                transition: .1s ease-in;
                -webkit-transition: .1s ease-in;
                -moz-transition: .1s ease-in;
                -o-transition: .1s ease-in;
                -ms-transition: .1s ease-in;
                &:hover{
                    color: #ec6149;
                    border-color: #ec6149;
                    background-color: rgba(236,97,73,.05);
                }
            }
            .log-in{
                float: right;
                margin: 11px 6px 0 10px;
                font-size: 15px;
                color: #969696;
            }
            .container{
                width: 960px;
                margin: 0 auto;
                &:after,&:before{
                    content: '';
                    display: table;
                }
                .collapse{
                    display: block;
                    height: auto;
                    padding-bottom: 0;
                    overflow: visible;
                    max-height:340px;
                    .nav{
                        float: left;
                        margin: 0;
                        padding-left: 0;
                        position: relative;
                        display: block;
                        &:after,&:before{
                            content: '';
                            display: table;
                        }
                        li{
                            line-height: 20px;
                        }
                        >li{
                            float: left;
                            margin-right: 10px;
                        }
                        >.active>a{
                            color: #ea6f5a;
                            background: none;
                        }
                        .tab{
                            a{
                                height: 56px;
                                line-height: 26px;
                                padding: 15px;
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>


