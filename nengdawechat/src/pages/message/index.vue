<template>
  <div class="message-contain">
    <div class="more-mes-list" @click="$router.push('/reply')">
      <div class="icon-div">
        <span class="icon-huida">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
        </span>
      </div>
      <div class="word-div">
        <div class="word">回答</div>
        <div class="number">
          <span v-if="answerCount == 0" class="icon-arrow"></span>
          <div v-else class="msg-box">{{answerCount}}</div>
        </div>
      </div>
    </div>
    <div class="more-mes-list" @click="$router.push('/follow')">
      <div class="icon-div">
        <span class="icon-guanzhu">
          <span class="path1"></span>
          <span class="path2"></span>
        </span>
      </div>
      <div class="word-div">
        <div class="word">关注</div>
        <div class="number">
          <span v-if="attentionCount == 0" class="icon-arrow"></span>
          <div v-else class="msg-box">{{attentionCount}}</div>
        </div>
      </div>
    </div>
    <div class="more-mes-list" @click="$router.push('/assist')">
      <div class="icon-div">
        <span class="icon-mes_dz">
          <span class="path1"></span>
          <span class="path2"></span>
        </span>
      </div>
      <div class="word-div">
        <div class="word">赞</div>
        <div class="number">
          <span v-if="supportCount == 0" class="icon-arrow"></span>
          <div v-else class="msg-box">{{supportCount}}</div>
        </div>
      </div>
    </div>
    <div class="more-mes-list" @click="$router.push('/commentary')">
      <div class="icon-div">
        <span class="icon-mes_pl">
          <span class="path1"></span>
          <span class="path2"></span>
        </span>
      </div>
      <div class="word-div">
        <div class="word">评论</div>
        <div class="number">
          <span v-if="revertCount == 0" class="icon-arrow"></span>
          <div v-else class="msg-box">{{revertCount}}</div>
        </div>
      </div>
    </div>
    <div class="more-mes-list" @click="$router.push('/notify')" ref="messageNotify">
      <img src="../../../static/img/tongzhi.png" class="noticeImg" alt>
      <div class="word-div no-border">
        <div class="word">通知</div>
        <div class="number">
          <span v-if="noticeCount == 0" class="icon-arrow"></span>
          <div v-else class="msg-box">{{noticeCount}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import homeMenu from "@/components/homeMenu";

export default {
  data() {
    return {
      userId: wx.getStorageSync("userId") ? wx.getStorageSync("userId") : 0,
      attentionCount: "",
      answerCount: "",
      supportCount: "",
      revertCount: "",
      noticeCount: "",
      totalCount: ""
    };
  },
  components: {
    "home-menu": homeMenu
  },
  // created() {
  //   wx.setNavigationBarTitle({
  //     title: "消息"
  //   });
  //   this.loadData();
  //   this.$root.Bus.$on("loadData", value => {
  //     if (value == 1) {
  //       this.loadData();
  //     }
  //   });
  // },
  // beforeDestroy() {
  //   this.$root.Bus.$off("loadData");
  // },
  methods: {
    loadData() {
      // 加载数据
      let id = this.userID;
      this.$http
        .get("/UserInfo/messageList?id=" + id)
        .then(response => {
          console.log(response, "response");

          if (response.status === 1) {
            this.attentionCount = response.result[0].attentionCount;
            this.answerCount = response.result[0].answerCount;
            this.supportCount = response.result[0].supportCount;
            this.revertCount = response.result[0].revertCount;
            this.noticeCount = response.result[0].noticeCount;
            this.totalCount =
              this.attentionCount +
              this.answerCount +
              this.supportCount +
              this.revertCount +
              this.noticeCount;
            for (let i in response.special) {
              response.special[i].counts == null
                ? 0
                : response.special[i].counts;
              this.totalCount += response.special[i].counts;
            }
            if (this.totalCount == 0) {
              EventBusTest.$emit("isMessage", false);
              localStorage.setItem("hasMessage", false);
            } else {
              EventBusTest.$emit("isMessage", true);
              localStorage.setItem("hasMessage", true);
            }
          }
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="scss">
.message-contain {
  margin: 0.3rem 0;
  background: #fff;
  padding: 0.2rem;
  .more-mes-list {
    display: flex;
    align-content: center;
    justify-content: flex-start;
    align-items: center;
    .noticeImg {
      height: 0.9rem;
      width: 1.1rem;
      margin-right: 0.37rem;
    }
    .icon-div {
      margin-right: 0.37rem;
      height: 1.2rem;
      span {
        display: inline-block;
        height: 1.2rem;
        line-height: 1.2rem;
        font-size: 0.9rem;
      }
    }
    .word-div {
      width: 100%;
      height: 0.98rem;
      line-height: 0.98rem;
      padding: 0.1rem 0;
      display: flex;
      align-content: center;
      justify-content: space-between;
      border-bottom: 1px solid #f0f0f0;
      &.no-border {
        border: none;
      }
      .word {
        font-size: 0.32rem;
        color: #444;
      }
    }
    .msg-box {
      font-size: 0.25rem;
      text-align: center;
      line-height: 0.3rem;
      height: 0.3rem;
      background-color: red;
      width: 0.4rem;
      color: white;
      border-radius: 0.4rem;
      margin-top: 0.35rem;
    }
  }
}
</style>



