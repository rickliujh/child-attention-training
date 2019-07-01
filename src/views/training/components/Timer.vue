<template>
  <div>
    <q-card class="bg-purple text-white">
      <q-card-section>
        <div class="title">
          <q-icon class="q-mr-sm" name="timer" size="20px"></q-icon>
          <span class="text-subtitle1 text-weight-medium">花费时间</span>
        </div>
        <div class="text-h6">{{str}}</div>
      </q-card-section>
    </q-card>

    <div v-show="isShowBtn">
      <q-btn id="stop" label="stop" @click="stop"></q-btn>
      <q-btn id="start" label="start" @click="start"></q-btn>
      <q-btn id="reset" label="reset" @click="reset"></q-btn>
    </div>
  </div>
</template>

<script>
export default {
  naem: 'Timer',
  props: {
    isShowBtn: {
      type: Boolean,
      default: false
    },
    timing: Boolean,
    isReset: Boolean
  },
  data () {
    return {
      // h: 0, // 定义时，分，秒，毫秒并初始化为0；
      m: 0,
      ms: 0,
      s: 0,
      timer: 0,
      str: '00:00.0000',
      timestamp: 0
    }
  },
  watch: {
    timing (newVal) {
      if (newVal === true) {
        this.start()
      } else {
        this.stop()
      }
    },
    isReset (newVal) {
      this.reset()
    }
  },
  methods: {
    startTimer () {
      // 定义计时函数
      this.timestamp += 5
      this.ms = this.ms + 5 // 毫秒
      if (this.ms >= 1000) {
        this.ms = 0
        this.s = this.s + 1 // 秒
      }
      if (this.s >= 60) {
        this.s = 0
        this.m = this.m + 1 // 分钟
      }
      // if (this.m >= 60) {
      //   this.m = 0
      //   this.h = this.h + 1 // 小时
      // }
      this.str =
        // this.toDub(this.h) +
        // ':' +
        this.toDub(this.m) +
        ':' +
        this.toDub(this.s) +
        '.' +
        this.toDubms(this.ms)
    },

    reset () {
      // 重置
      clearInterval(this.timer)
      // this.h = 0
      this.timestamp = 0
      this.m = 0
      this.ms = 0
      this.s = 0
      this.str = '00:00.0000'
    },

    start () {
      // 开始
      this.timer = setInterval(this.startTimer, 5)
    },

    stop () {
      // 暂停
      clearInterval(this.timer)
    },

    toDub (n) {
      // 补0操作
      if (n < 10) {
        return '0' + n
      } else {
        return '' + n
      }
    },

    toDubms (n) {
      // 给毫秒补0操作
      if (n < 10) {
        return '000' + n
      } else if (n < 100) {
        return '00' + n
      } else if (n < 1000) {
        return '0' + n
      } else {
        return n
      }
    }
  },
  beforeDestroy () {
    this.stop()
  }
}
</script>

<style lang="stylus" scoped>
.title
  display flex
  align-items center
</style>
