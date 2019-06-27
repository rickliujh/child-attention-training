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
        @total-time="handleTotalTime"
      ></control-panel>
    </q-scroll-area>

    <q-dialog v-model="dialog" seamless position="right">
      <q-card style="width: 350px">
        <q-card-section class="row items-center no-wrap">
          <div>
            <div class="text-weight-bold">数据已保存</div>
            <div class="text-grey">耗时：{{totalTime}}s  错误：{{wrongNum}}次</div>
          </div>

          <q-space />

          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import _ from 'underscore'
import { DataManager, DataType } from '../../../electron/renderer/data'
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
      isDone: true,
      wrongNum: 0,
      totalTime: 0,
      dialog: false
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
      this.wrongNum = 0
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
        this.wrongNum++
      }
    },
    handleTotalTime (time) {
      this.totalTime = time
      this.saveTrainingData()
    },
    showDialog () {
      this.dialog = true
      setTimeout(() => {
        this.dialog = false
      }, 3000)
    },
    saveTrainingData () {
      const DM = new DataManager()
      DM.saveData(DataType.SchulteTable, {
        time: this.totalTime,
        wrong: this.wrongNum
      })
      this.showDialog()
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
