<template>
  <div class="row items-start absolute-top fit no-scroll">
    <grid-view class="q-pa-md col" :grids="grids" @grid-click="handleGridClick"></grid-view>
    <q-scroll-area class="q-pr-md col-3 full-height">
      <control-panel
        :isRight="isRight"
        :isDone="isDone"
        @grid-count-change="handleGridCountChange"
        @start="handleStart"
        @reset="handleReset"
      ></control-panel>
    </q-scroll-area>
  </div>
</template>

<script>
import _ from 'underscore'
import ControlPanel from '../components/ControlPanel'
import GridView from '../components/GridView'
export default {
  name: 'SchulteGridTraining',
  components: {
    ControlPanel,
    GridView
  },
  data () {
    return {
      grids: this.getGrids(25),
      nextValue: 1,
      isRight: false,
      isDone: true
    }
  },
  methods: {
    getGrids (count) {
      return Array.apply(null, { length: count }).map(function (_, index) {
        return {
          id: index,
          label: index + 1
        }
      })
    },
    shuffle () {
      this.grids = _.shuffle(this.grids)
    },
    handleGridCountChange (value) {
      this.grids = this.getGrids(value)
      this.shuffle()
    },
    handleStart () {
      this.nextValue = 1
      this.isDone = false
    },
    handleReset () {
      this.isRight = false
      this.shuffle()
      this.nextValue = 1
      this.isDone = true
    },
    handleGridClick (value) {
      if (this.isDone === true) {
        return
      }
      if (value === this.nextValue) {
        if (value === this.grids.length) {
          this.isDone = true
          return
        }
        this.isRight = true
        this.nextValue++
      } else {
        this.isRight = false
      }
    }
  },
  mounted () {
    this.shuffle()
  }
}
</script>

<style lang="stylus" scoped>
.page
  // overflow hidden
  // position absolute
  // left 0
  // right 0
  // top 0
  // bottom 0
</style>
