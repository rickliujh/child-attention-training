<template>
  <div class="full-height">
    <div class="content" :style="contentStyle">
      <transition-group name="cell" tag="div" class="sudoku-container">
        <q-btn
          class="cell"
          :style="itemStyle"
          flat
          color="primary"
          v-for="item of grids"
          :key="item.id"
          @click="handleGridClick(item.label)"
        >
          <span :style="itemFontSizeStyle">{{item.label}}</span>
        </q-btn>
      </transition-group>
    </div>
    <q-resize-observer @resize="onResize"></q-resize-observer>
  </div>
</template>

<script>
export default {
  name: 'GridView',
  props: {
    grids: Array
  },
  data () {
    return {
      clientSize: {
        width: 10,
        height: 10
      }
    }
  },
  computed: {
    contentSize () {
      let mixSize =
        this.clientSize.height > this.clientSize.width
          ? this.clientSize.width : (this.clientSize.height - 25)
      return mixSize
    },
    squareLength () {
      let rowNum = Math.sqrt(this.grids.length)
      let squareLenght = (this.contentSize * 1.0) / rowNum
      return squareLenght
    },
    contentStyle () {
      let res = this.contentSize + 'px'
      return {
        width: res,
        height: res
      }
    },
    itemStyle () {
      let lenghtStr = this.squareLength + 'px'
      return {
        width: lenghtStr,
        height: lenghtStr
      }
    },
    itemFontSizeStyle () {
      let lenghtStr = this.squareLength / 2 + 'px'
      return {
        fontSize: lenghtStr
      }
    }
  },
  methods: {
    onResize (size) {
      this.clientSize = {
        width: size.width,
        height: size.height
      }
    },
    handleGridClick (clickValue) {
      this.$emit('grid-click', clickValue)
    }
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
  text-align center

  .text
    font-size 100%

.cell-move
  transition transform 1s
</style>
