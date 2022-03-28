<template>
  <transition name="slide" >
    <div class="modal" v-show="showModal">
      <div class="mask"></div>

      <div class="modal-dialog">
        <div class="modal-header">
          <span>{{title}}</span>
          <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
        </div>
        <div class="modal-body">
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <a
            href="javascript:;"
            class="btn"
            v-if="btnType == 1"
            @click="$emit('submit')"
            >{{sureText}}</a
          >
          <a
            href="javascript:;"
            class="btn"
            v-if="btnType == 2"
            @click="$emit('cancel')"
            >{{canclText}}</a
          >
          <div class="btn-group" v-if="btnType == 3">
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn" @click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: "modal",
  props: {
    // 弹框类型，small：小 、middle：中 、large：大、form：表单
    modalType: {
      type: String,
      default: "form",
    },
    //弹框标题
    title: String,
    //按钮类型：1：确定 、2：取消 、3：确定+取消
    btnType: String,
    sureText: {
      type: String,
      default: "确定",
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    showModal: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
<style lang="scss">
@import "./../assets/scss/config.scss";
@import "./../assets/scss/mixin.scss";
  .modal {
    @include position(fixed);
    z-index: 15;
    transition: all 0.5s;
    .mask {
        @include position(fixed);
        opacity: 50%;
        background-color: $colorI;
    }
    &.slide-enter-active {
        top: 0;
    }
    &.slide-leave-active {
        top: -100%;
    }
    &.slide-enter {
        //顺序有影响enter在下面
        top: -100%;
    }
    .modal-dialog {
        @include position(absolute, 50%, 35%, 660px, auto);
        background-color: $colorG;
        transform: translate(-50%, -50%);
        .modal-header {
            display: relative;
            height: 60px;
            background-color: $colorJ;
            padding: 0 25px;
            line-height: 60px;
            font-size: $fontI;
            .icon-close {
                @include positionImg(absolute, 23px, 25px, 14px, 14px, "/imgs/icon-close.png");
                transition: all 200ms;
                &:hover {
                    transform: scale(1.5); //放大1.5倍
                }
            }
        }
        .modal-body {
            padding: 42px 40px 54px;
            font-size: $fontJ;
        }
        .modal-footer {
            height: 82px;
            line-height: 82px;
            text-align: center;
            background-color: $colorJ;
        }
    }
}
</style>