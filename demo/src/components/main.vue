<template>
  <div
    class="el-carousel"
    :class="{ 'el-carousel--card': type === 'card' }"
    @mouseenter.stop="handleMouseEnter"
    @mouseleave.stop="handleMouseLeave">
    <div
      class="el-carousel__container"
      :style="{ height: height }">
      <transition name="carousel-arrow-left">
        <button
          type="button"
          v-if="arrow !== 'never'"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex > 0)"
          @mouseenter="handleButtonEnter('left')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex - 1)"
          class="el-carousel__arrow el-carousel__arrow--left">
          <i class="el-icon-arrow-left"></i>
        </button>
      </transition>
      <transition name="carousel-arrow-right">
        <button
          type="button"
          v-if="arrow !== 'never'"
          v-show="(arrow === 'always' || hover) && (loop || activeIndex < items.length - 1)"
          @mouseenter="handleButtonEnter('right')"
          @mouseleave="handleButtonLeave"
          @click.stop="throttledArrowClick(activeIndex + 1)"
          class="el-carousel__arrow el-carousel__arrow--right">
          <i class="el-icon-arrow-right"></i>
        </button>
      </transition>
      <slot></slot>
    </div>
    <ul
      class="el-carousel__indicators"
      v-if="indicatorPosition !== 'none'"
      :class="{ 'el-carousel__indicators--labels': hasLabel, 'el-carousel__indicators--outside': indicatorPosition === 'outside' || type === 'card' }">
      <li
        v-for="(item, index) in items"
        :key="index"
        class="el-carousel__indicator"
        :class="{ 'is-active': index === activeIndex }"
        @mouseenter="throttledIndicatorHover(index)"
        @click.stop="handleIndicatorClick(index)">
        <button class="el-carousel__button"><span v-if="hasLabel">{{ item.label }}</span></button>
      </li>
    </ul>
  </div>
</template>
<script>
import { addResizeListener, removeResizeListener } from '@/common/common';
import { throttle } from 'throttle-debounce';

export default {
  name: 'ElCarousel',

  props: {
    initialIndex: {
      type: Number,
      default: 0
    },
    height: String,
    trigger: {
      type: String,
      default: 'hover'
    },
    autoplay: {
      type: Boolean,
      default: true
    },
    interval: {
      type: Number,
      default: 3000
    },
    indicatorPosition: String,
    indicator: {
      type: Boolean,
      default: true
    },
    arrow: {
      type: String,
      default: 'hover'
    },
    type: String,
    loop: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      items: [],
      activeIndex: -1,
      containerWidth: 0,
      timer: null,
      hover: false
    };
  },

  computed: {
    hasLabel() {
      return this.items.some(item => item.label.toString().length > 0);
    }
  },

  watch: {
    items(val) {
      if (val.length > 0) this.setActiveItem(this.initialIndex);
    },

    activeIndex(val, oldVal) {
      this.resetItemPosition(oldVal);
      this.$emit('change', val, oldVal);
    },

    autoplay(val) {
      val ? this.startTimer() : this.pauseTimer();
    },

    loop() {
      this.setActiveItem(this.activeIndex);
    }
  },

  methods: {
    handleMouseEnter() {
      this.hover = true;
      this.pauseTimer();
    },

    handleMouseLeave() {
      this.hover = false;
      this.startTimer();
    },

    itemInStage(item, index) {
      const length = this.items.length;
      if (index === length - 1 && item.inStage && this.items[0].active ||
        (item.inStage && this.items[index + 1] && this.items[index + 1].active)) {
        return 'left';
      } else if (index === 0 && item.inStage && this.items[length - 1].active ||
        (item.inStage && this.items[index - 1] && this.items[index - 1].active)) {
        return 'right';
      }
      return false;
    },

    handleButtonEnter(arrow) {
      this.items.forEach((item, index) => {
        if (arrow === this.itemInStage(item, index)) {
          item.hover = true;
        }
      });
    },

    handleButtonLeave() {
      this.items.forEach(item => {
        item.hover = false;
      });
    },

    updateItems() {
      this.items = this.$children.filter(
        child => child.$options.name === 'ElCarouselItem'
        // child => {
        //   return child.$options.name === 'ElCarouselItem'
        // }
      );
    },
    
    resetItemPosition(oldIndex) {
      this.items.forEach((item, index) => {
        item.translateItem(index, this.activeIndex, oldIndex);
      });
    },

    playSlides() {
      if (this.activeIndex < this.items.length - 1) {
        this.activeIndex++;
      } else if (this.loop) {
        this.activeIndex = 0;
      }
    },

    pauseTimer() {
      clearInterval(this.timer);
    },

    startTimer() {
      if (this.interval <= 0 || !this.autoplay) return;
      this.timer = setInterval(this.playSlides, this.interval);
    },

    setActiveItem(index) {
      if (typeof index === 'string') {
        const filteredItems = this.items.filter(item => item.name === index);
        if (filteredItems.length > 0) {
          index = this.items.indexOf(filteredItems[0]);
        }
      }
      index = Number(index);
      if (isNaN(index) || index !== Math.floor(index)) {
        process.env.NODE_ENV !== 'production' &&
        console.warn('[Element Warn][Carousel]index must be an integer.');
        return;
      }
      let length = this.items.length;
      const oldIndex = this.activeIndex;
      if (index < 0) {
        this.activeIndex = this.loop ? length - 1 : 0;
      } else if (index >= length) {
        this.activeIndex = this.loop ? 0 : length - 1;
      } else {
        this.activeIndex = index;
      }
      if (oldIndex === this.activeIndex) {
        this.resetItemPosition(oldIndex);
      }
    },

    prev() {
      this.setActiveItem(this.activeIndex - 1);
    },

    next() {
      this.setActiveItem(this.activeIndex + 1);
    },

    handleIndicatorClick(index) {
      this.activeIndex = index;
    },

    handleIndicatorHover(index) {
      if (this.trigger === 'hover' && index !== this.activeIndex) {
        this.activeIndex = index;
      }
    },
  },

  created() {
    this.throttledArrowClick = throttle(300, true, index => {
      this.setActiveItem(index);
    });
    this.throttledIndicatorHover = throttle(300, index => {
      this.handleIndicatorHover(index);
    });
  },

  mounted() {
    this.updateItems();
    this.$nextTick(() => {
      console.log('testtesttesttest');
      
      addResizeListener(this.$el, this.resetItemPosition);
      if (this.initialIndex < this.items.length && this.initialIndex >= 0) {
        this.activeIndex = this.initialIndex;
      }
      this.startTimer();
    });
  },

  beforeDestroy() {
    if (this.$el) removeResizeListener(this.$el, this.resetItemPosition);
  }
};
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


