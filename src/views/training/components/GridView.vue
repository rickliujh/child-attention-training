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
  </div>
</template>

<script>
import { mapState } from 'vuex'
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
    ...mapState(['leftDrawerOpen']),
    contentSize () {
      let mixSize =
        this.clientSize.height > this.clientSize.width
          ? this.clientSize.width
          : this.clientSize.height
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
  watch: {
    leftDrawerOpen () {
      this.updateWinSize()
    }
  },
  methods: {
    updateWinSize () {
      setTimeout(() => {
        this.clientSize = {
          width: this.$el.clientWidth,
          height: this.$el.clientHeight
        }
      }, 500)
    },
    handleGridClick (clickValue) {
      this.$emit('grid-click', clickValue)
    }
  },
  mounted () {
    window.addEventListener('resize', this.updateWinSize)
    this.updateWinSize()
  },
  beforeDestroy () {
    window.removeEventListener('resize', this.updateWinSize)
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
