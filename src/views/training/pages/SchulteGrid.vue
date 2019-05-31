<template>
  <div class="page q-ma-md">
    <div class="content" :style="contentStyle">
      <transition-group name="cell" tag="div" class="sudoku-container">
        <q-btn
          class="cell"
          :style="itemStyle"
          flat
          color="primary"
          v-for="item of grid"
          :key="item.id"
          @click="handleGridClick(item.label)"
        >
          <span :style="itemFontSizeStyle">{{item.label}}</span>
        </q-btn>
      </transition-group>
    </div>
  </div>
</template>

<script>
import _ from 'underscore'
export default {
  name: 'SchulteGridTraining',
  data () {
    return {
      grid: Array.apply(null, { length: 25 }).map((_, index) => {
        return {
          id: index,
          label: index + 1
        }
      }),
      clientSize: {
        width: 10,
        height: 10
      },
      nextValue: 1
    }
  },
  computed: {
    contentSize () {
      let mixSize =
        this.clientSize.height > this.clientSize.width
          ? this.clientSize.width
          : this.clientSize.height
      return mixSize
    },
    squareLength () {
      let rowNum = Math.sqrt(25)
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
    updateWinSize () {
      this.clientSize = {
        width: this.$el.clientWidth,
        height: this.$el.clientHeight
      }
    },
    shuffle () {
      this.grid = _.shuffle(this.grid)
    },
    handleGridClick (clickValue) {
      if (this.nextValue !== clickValue) {
        console.log('wrong')
        return
      }
      console.log('right')
      this.nextValue++
      if (this.nextValue > this.grid.length) {
        console.log('done')
      }
    }
  },
  mounted () {
    window.addEventListener('resize', this.updateWinSize)
    this.updateWinSize()
    this.shuffle()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateWinSize)
  }
}
</script>

<style lang="stylus" scoped>
.page
  overflow hidden
  position absolute
  left 0
  right 0
  top 0
  bottom 0

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
