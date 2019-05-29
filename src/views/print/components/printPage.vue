<template>
  <div>
    <div class="opt" v-show="isShow">
      <button v-on:click="shuffle">Shuffle</button>
      <button v-on:click="doPrint">Print</button>
      <span>
        count:
        <input type="text" v-model="count" placeholder="enter number">
      </span>
      <span>
        font size:
        <input type="text" v-model="fontSize" placeholder="enter number">
      </span>
    </div>
    <div class="touchbar" @click="handleTouchbarClick"></div>
    <transition-group name="cell" tag="div" class="sudoku-container">
      <div class="cell" :style="size" v-for="item in cells" :key="item.id">{{ item.number }}</div>
    </transition-group>
  </div>
</template>

<script>
import _ from 'underscore'
// import { ipcRenderer } from "electron";
export default {
  name: 'printPage',
  data: function () {
    return {
      count: 81,
      cells: [],
      fontSize: 6,
      isShow: true,
      timer: null
    }
  },
  computed: {
    size () {
      let rowNum = Math.sqrt(this.count)
      let squareLenght = (210 - (0.2 * rowNum + 1)) / rowNum
      let lenghtStr = squareLenght + 'mm'
      let fontSizeStr = this.fontSize + 'mm'
      return {
        width: lenghtStr,
        height: lenghtStr,
        'font-size': fontSizeStr
      }
    }
  },
  methods: {
    shuffle: function () {
      this.cells = _.shuffle(this.cells)
    },
    doPrint () {
      this.isShow = false
      // ipcRenderer.send("print", "");
      // window.print();
    },
    putNotice (msg) {
      if (!this.timer) {
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(() => {
        alert(msg)
      }, 100)
    },
    handleTouchbarClick () {
      this.isShow = true
    }
  },
  watch: {
    count (newCount, oldCount) {
      console.log(oldCount)
      if (!newCount) {
        return
      }
      if (newCount > 625) {
        this.putNotice('You can only set up to 625 squares, which is 25 × 25')
        this.count = 625
      } else {
        let rowNum = Math.sqrt(newCount)
        this.cells = Array.apply(null, { length: newCount }).map(function (
          _,
          index
        ) {
          return {
            id: index,
            number: (index % rowNum) + 1
          }
        })
        this.shuffle()
      }
    }
  },
  mounted () {
    this.cells = Array.apply(null, { length: this.count }).map(function (
      _,
      index
    ) {
      return {
        id: index,
        number: (index % 9) + 1
      }
    })
    this.shuffle()

    // 加载Electron
    // const { ipcRenderer } = require("electron");
    // ipcRenderer.on("webview-print-render", (event, data) => {
    //   this.count = data.count;
    //   this.fontSize = data.fontSize;
    // });
    // ipcRenderer.sendToHost("webview-print-do");
  }
}
</script>

<style lang="stylus" scoped>
// body
// margin 0
// #test
// display flex
// align-items center
// justify-content center
// width 210mm
// height 297mm
// margin 0 auto
.opt
  z-index 2
  position fixed
  top 10%
  flex 1
  align-self flex-start

.touchbar
  position fixed
  top 10%
  width 15mm
  height 1.5mm
  background #ccc

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
  border 0.2mm solid #aaa
  margin-right -0.2mm
  margin-bottom -0.2mm
  text-align center

.cell-move
  transition transform 1s
</style>
