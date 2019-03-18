<template>
  <div class="search">
    <search-bar @totalTopHeightStyles='totalTopHeightStyles' @searchKeyWords="searchKeyWords"></search-bar>

    <article :style="totalTopHeightStyles2">
      <scroll-view class="showList" scroll-y="true"> 
        <div style="min-height:800px">
        <div v-if="showHot">
          <div class="list hotlist">
            <h3>热搜</h3>
            <p
              class="hotName"
              v-for="(hot, index) in hotList"
              :key="index"
              @click="findAll(hot.keyword)"
            >{{hot.keyword}}</p>
          </div>
          <!-- <div class="list">
            <h3>历史</h3>
            <ul>
              <li v-for="(history, index) in historyList" :key="index">
                <div @click="findAll(history.keyword)">
                  <i class="icon-bzh_lda"></i>
                  <p>{{history.keyword}}</p>
                </div>
                <i class="icon-bzh_tc" @click="clearSinglerHistory(history.KeyID)"></i>
              </li>
            </ul>
            <div class="clear" @click="clearHistory()">
              <i class="icon-shijian"></i>
              <span>清空历史搜索</span>
            </div>
          </div> -->
        </div>
        <ul>
          <li
            class="searchAll"
            v-for="(item, index) in serarchList"
            :key="index"
            @click="findAll(item.dataName)"
          >
            <p>{{item.dataName}}</p>
            <span>{{item.chioce}}</span>
          </li>
        </ul>
        <div class="moreSearch" v-if="searchValue!=''&&serarchList" @click="findAll(searchValue)">
          <p>查看更多搜索记录</p>
        </div>
        <div class="moreSearch" v-else-if="searchValue!=''">
          <p>暂无搜索记录</p>
        </div>
        </div>
      </scroll-view>
    </article>
  </div>
</template>
<script>
import searchBar from "@/components/searchBar";

export default {
  components: {
    "search-bar": searchBar,
  },
  data() {
    return {
      searchValue: "",
      userId:wx.getStorageSync('userId')?wx.getStorageSync('userId'):0,
      serarchList: [],
      hotList: [],
      historyList: [],
      showHot: true,
      totalTopHeightStyles2:'',
    };
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
  mounted() {
    this.getSearchHistory();
    this.getSearchHot();
  },
  watch: {
    searchValue(curVal, oldVal) {
      this.showHot = curVal == "" ? true : false;
      this.getSearch();
    }
  },
  methods: {
    totalTopHeightStyles(val){
      this.totalTopHeightStyles2=val
    },
    searchKeyWords(searchKeyWords){
      this.searchValue = searchKeyWords
    },
    getSearchHot() {
      this.$http
        .get("/ForumList/SearchHot")
        .then(response => {
          let res  = response.data
          this.hotList = res.result;
        })
        .catch(error => {});
    },
    getSearchHistory() {
      this.$http
        .get("/UserInfo/SearchHistory", {
          id: this.userId
        })
        .then(response => {
          let res  = response.data
          if (res.status == 1) {
            this.historyList = res.result.reverse();
          }
        })
        .catch(error => {});
    },
    findAll(m) {
        m = m.replace(/\\/g,'')
        if(m.trim()){
          wx.redirectTo({
            url: '/pages/searchDetail/main?searchValue='+m
          })
        }else{
          wx.redirectTo({
            url: '/pages/index/main'
          })
        }
    },
    clearSinglerHistory(item) {
      this.$http.delete("/UserInfo/DeleteOneHistory",{
          id: item
      })
        .then(response => {
          this.getSearchHistory();
        })
        .catch(error => {});
    },
    clearHistory() {
      this.$http({
        method: "delete",
        url: "/UserInfo/DeleteSearchHistory",
        params: {
          id: this.userId
        }
      }).then(response => {
        this.historyList = [];
      });
    },
    getSearch: function() {
      this.$http
        .get("/ForumList/FindAll_ComboBox", {
          keyword: this.searchValue,
          id: this.userId
        })
        .then(res => {
          let response = res.data
          this.serarchList = response.result;
          if (this.serarchList.length > 5) {
            this.serarchList = this.serarchList.splice(0, 5);
          }
          for (let item = 0; item < this.serarchList.length; item++) {
            if (this.serarchList[item].flag == 0) {
              this.serarchList[item].chioce = "话题";
            } else if (this.serarchList[item].flag == 1) {
              this.serarchList[item].chioce = "问题";
            } else if (this.serarchList[item].flag == 2) {
              this.serarchList[item].chioce = "文章";
            } else {
              this.serarchList[item].chioce = "用户";
            }
          }
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="scss">
.search article {
  position: absolute;
  top: 120rpx;
  bottom: 0;
  overflow: auto;
  width: 100%;
  background: white;
  padding: 0 0.3rem 0 0.3rem;
  box-sizing: border-box;
  .showList{
    height:100%;
    overflow: auto;
  }
  .Internet {
    font-size: 0.4rem;
    top: 200rpx;
    left: 50%;
    margin-left: -100px;
    color: gray;
    position: absolute;
  }
  .moreSearch {
    width: 100%;
    height: 40px;
    font-size: 0.28rem;
    line-height: 40px;
    text-align: center;
    color: #99999a;
  }
  .list {
    width: 100%;
    padding-top: 0.4rem;
    h3 {
      font-size: 0.34rem;
    }
    li {
      width: 100%;
      height: 0.94rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 0.06rem solid #eaeaea;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-left: 0;
      margin-top: 0;
      margin-left: 0;
      div {
        width: 80%;
        display: flex;
        align-items: center;
      }
      i {
        font-size: 0.3rem;
      }
      p {
        padding-left: 0.2rem;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.3rem;
      }
    }
  }
  .clear {
    height: 0.8rem;
    line-height: 0.8rem;
    i {
        font-size: 0.3rem;
        float: left;
        line-height: 0.8rem;
    }
    span {
      padding-left: 0.2rem;
      font-size: 0.3rem;
    }
  }
  .hotName {
    height: 0.66rem;
    background: #e3e3e3;
    margin: 0.4rem 0.3rem 0 0;
    display: inline-block;
    line-height: 0.6rem;
    border-radius: 0.2rem;
    padding: 0 0.34rem;
    font-size: 0.3rem;
  }
  .searchAll {
    width: 100%;
    height: 0.8rem;
    line-height: 0.8rem;
    display: flex;
    justify-content: space-between;
    p {
      width: 60%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 0.3rem
    }
    span{
      font-size: 0.3rem
    }
  }
}
</style>