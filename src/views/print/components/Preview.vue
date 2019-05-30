<template>
  <div class="content" :style="contentSize">
    <transition-group name="cell" tag="div" class="sudoku-container">
      <div class="cell" :style="itemSize" v-for="item in arr" :key="item.id">{{ item.number }}</div>
    </transition-group>
  </div>
</template>

<script>
export default {
  name: 'PrintPreview',
  props: {
    arr: Array,
    fontSize: Number
  },
  data () {
    return {
      clientWidth: 10
    }
  },
  computed: {
    contentSize () {
      return {
        width: this.clientWidth,
        height: this.clientWidth
      }
    },
    itemSize () {
      let rowNum = Math.sqrt(this.arr.length)
      let squareLenght = (this.clientWidth * 1.0) / rowNum
      let lenghtStr = squareLenght + 'px'
      let fontSizeStr = this.fontSize + 5 + 'px'
      return {
        width: lenghtStr,
        height: lenghtStr,
        'font-size': fontSizeStr
      }
    }
  },
  methods: {
    updateWidth () {
      setTimeout(() => {
        this.clientWidth = this.$el.clientWidth
      }, 500)
    }
  },
  mounted () {
    window.addEventListener('resize', this.updateWidth)
    this.updateWidth()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateWidth)
  }
}
</script>

<style lang="stylus" scoped>
.content
  display flex
  align-items center
  justify-content center
  margin 0 auto

.sudoku-container
  display flex
  flex-wrap wrap
  overflow hidden
  width 100%
  height 0
  padding-bottom 100%

.cell
  display flex
  justify-content space-around
  align-items center
  border 1px solid #aaa
  margin-right -1px
  margin-bottom -1px
  // padding 0
  // margin-left 0
  // margin-top 0
  text-align center

.cell-move
  transition transform 1s
</style>
