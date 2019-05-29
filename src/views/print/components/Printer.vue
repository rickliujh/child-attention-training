<template>
  <div ref="printObj" v-show="false">
    <div class="cell" :style="size" v-for="item in arr" :key="item.id">{{ item.number }}</div>
  </div>
</template>

<script>
import { sendPrintEvent } from '../../../electron/renderer/ipc'
export default {
  name: 'PrintPrinter',
  props: {
    arr: Array,
    fontSize: Number
  },
  computed: {
    size () {
      let rowNum = Math.sqrt(this.arr.length)
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
    print (isShowPrintWin, printDeviceName) {
      let data = {
        HTML: this.$refs.printObj.innerHTML,
        printOptions: {
          silent: !isShowPrintWin,
          printBackground: false,
          deviceName: isShowPrintWin === false ? printDeviceName : null
        }
      }
      sendPrintEvent(data)
    }
  }
}
</script>

<style lang="stylus" scoped></style>
