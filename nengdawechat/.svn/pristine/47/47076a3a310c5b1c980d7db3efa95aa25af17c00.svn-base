<template>
  <div class="searchDetail-contain">
    <search-bar @totalTopHeightStyles='totalTopHeightStyles' @articleStyles='articleStyles' v-if="isAdd" :searchValue="searchValue"></search-bar>
    <div class="tabs" :style="totalTopHeightStyles2">
      <span :class="nowselected == 0 ? 'active':''" @click="toSearch(0)">全部</span>
      <span :class="nowselected == 2 ? 'active':''" @click="toSearch(2)">文章</span>
      <span :class="nowselected == 3 ? 'active':''" @click="toSearch(3)">用户</span>
      <span :class="nowselected == 1 ? 'active':''" @click="toSearch(1)">问题</span>
    </div>

    <article :style='articleStyles2'>
      <div class="page1">
        <problem-List
          :pageList="pageList"
          searchValue="searchValue"
          :hasNoData="hasNoData"
          v-if="isShowPage"
        ></problem-List>
        <div class="load-tips" v-show="pageList.length>0&&isLoading">正在加载中…</div>
        <div class="load-tips" v-show="pageList.length>0&&loadFinish">已加载完毕</div>
      </div>
    </article>
  </div>
</template>
<script>
import searchBar from "@/components/searchBar";
import ProblemList from "@/components/ProblemList";

export default {
  components: {
    "search-bar": searchBar,
    "problem-List": ProblemList
  },
  data() {
    return {
      searchValue: "",
      userId: wx.getStorageSync("userId") ? wx.getStorageSync("userId") : 0,
      nowselected: "",
      pageList: [],
      hasNoData: false,
      isShowPage: false,
      pageNow: 1,
      pageSize: 10,
      isLoading: false,
      loadFinish: false,
      isAdd: false,
      totalTopHeightStyles2:'',
      articleStyles2:''
    };
  },
  onLoad: function(option) {
    this.isAdd = false;
    this.pageList = [];
    this.isShowPage = false;
    this.searchValue = option.searchValue;
    wx.showLoading({
      title: "加载中"
    });
    setTimeout(() => {
      this.isAdd = true;
    }, 0);

    this.searchAll();
  },
  onReachBottom() {
    if (!this.loadFinish) {
      this.pageNow++;
      this.searchAll();
    }
  },
     //转发
  onShareAppMessage: function (tr) {
    let that =this;
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length-1] //获取当前页面的对象
    var url = currentPage.route //当前页面url
    console.log(url)
      return {
        title: '能答', // 转发后 所显示的title
        path: url, // 相对的路径
        success: (res)=>{    // 成功后要做的事情
          console.log(res.shareTickets[0])
          // console.log
         
          wx.getShareInfo({
            shareTicket: res.shareTickets[0],
            success: (res)=> { 
              that.setData({
                isShow:true
              }) 
              console.log(that.setData.isShow)
             },
            fail: function (res) { console.log(res) },
            complete: function (res) { console.log(res) }
          })
        },
        fail: function (res) {
          // 分享失败
          console.log(res)
        }
      }
  },
  async onPullDownRefresh() {
    this.loadFinish=false
    this.pageList = [];
    this.pageNow=1
    wx.showLoading({
      title: "加载中"
    });
    this.searchAll();

    // 停止下拉刷新
    wx.stopPullDownRefresh();
  },
  
  methods: {
    articleStyles(val){
      this.articleStyles2=val
    },
    totalTopHeightStyles(val){      
      this.totalTopHeightStyles2=val
    },
    toSearch(num) {
      this.nowselected = num;
      this.pageList = [];
      this.pageNow = 1;
      this.isShowPage = false;
      wx.showLoading({
        title: "加载中"
      });
      this.searchAll();
    },
    searchAll() {
      let nowselected = "";
      this.isLoading = true;
      if (this.nowselected == 0) {
        nowselected = "";
      } else {
        nowselected = this.nowselected;
      }
      this.$http
        .get("/ForumList/FindAll", {
          keyWord: this.searchValue,
          id: this.userId,
          flag: nowselected,
          pageNow: this.pageNow,
          pageSize: this.pageSize
        })
        .then(res => {
          wx.hideLoading();
          this.isShowPage = true;
          this.isLoading = false;
          let response = res.data;
          if (response.status == 1) {
            var reg = new RegExp("(" + this.searchValue + ")", "g");
            for (let i in response.result) {
              response.result[i].userPic = response.result[i].userpic;
              response.result.map(val => {
                if (val.title) {
                  val.title = val.title.replace(
                    reg,
                    '<span style="color:#ff7b00">' +
                      this.searchValue +
                      "</span>"
                  );
                }
                if (val.remark1) {
                  val.remark1 = val.remark1.replace(
                    reg,
                    '<span style="color:#ff7b00">' +
                      this.searchValue +
                      "</span>"
                  );
                }
                if (val.accountnumber) {
                  val.accountnumber = val.accountnumber.replace(
                    reg,
                    '<span style="color:#ff7b00">' +
                      this.searchValue +
                      "</span>"
                  );
                }
              });
            }
            if (response.result.length < this.pageSize) {
              this.loadFinish = true;
            } else {
              this.loadFinish = false;
            }
            if (this.pageList.length > 0) {
              this.pageList = this.pageList.concat(response.result);
            } else {
              this.pageList = response.result;
            }
            if (this.pageList.length > 0) {
              this.hasNoData = false;
            } else {
              this.hasNoData = true;
            }
          } else if (response.status == 0) {
            if (response.result.length > 0) {
              this.hasNoData = false;
              if (response.result.length < this.pageSize) {
                this.loadFinish = true;
              } else {
                this.loadFinish = false;
              }
            } else {
              this.loadFinish = true;
              this.hasNoData = true;
            }
          }
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="scss" >
.searchDetail-contain {
  height: 100%;
  .tabs {
    position: fixed;
    top: 120rpx;
    width: 100%;
    display: flex;
    z-index: 100;
    height: 0.7rem;
    span {
      flex: 1;
      display: inline-block;
      padding: 10px;
      font-size: 14px;
      border-bottom: 2px solid transparent;
      text-align: center;
      height: 35px;
      line-height: 35px;
      background: white;
    }
    .active {
      border-bottom: 2px solid #ff7b00;
      color: #ff7b00;
    }
  }
  article {
    position: absolute;
    top: 230rpx;
    width: 100%;
    overflow: auto;
    .load-tips {
      text-align: center;
      font-size: 0.3rem;
      color: #bbb;
      margin: 0.2rem 0;
    }
  }
}
</style>

