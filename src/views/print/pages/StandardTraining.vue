<template>
  <q-page class="row items-start">
    <print-preview class="col" :arr="cells" :fontSize="fontSize"></print-preview>
    <print-selector
      class="col-4"
      @shuffle="handleShuffle"
      @print="handlePrint"
      @is-continuous="handleIsContinuous"
      @isShow-window="handleIsShowWindow"
      @count-change="handleCountChange"
      @fontSize-change="handleFontSizeChange"
    ></print-selector>
    <print-printer :arr="cells" :fontSize="fontSize" ref="printer"></print-printer>
  </q-page>
</template>

<script>
import _ from 'underscore'
import PrintSelector from '../components/PrintSelector'
import PrintPreview from '../components/Preview'
import PrintPrinter from '../components/Printer'

export default {
  name: 'StandardTraining',
  components: {
    PrintSelector,
    PrintPreview,
    PrintPrinter
  },
  data () {
    return {
      cells: this.getCells(81, this.noContinuous),
      count: 81,
      fontSize: 15,
      isContinous: false,
      isShowWindow: true
    }
  },
  methods: {
    getCells (count, callback) {
      let rowCount = Math.sqrt(count)
      return Array.apply(null, { length: count }).map(function (_, index) {
        return {
          id: index,
          number: callback(index, rowCount)
        }
      })
    },
    noContinuous (index, rowCount) {
      return (index % rowCount) + 1
    },
    continuous (index) {
      return index + 1
    },
    handleShuffle () {
      this.cells = _.shuffle(this.cells)
    },
    handleIsContinuous (flag) {
      if (this.isContinous === flag) {
        return
      }
      this.isContinous = flag
      if (flag) {
        this.cells = this.getCells(this.cells.length, this.continuous)
      } else {
        this.cells = this.getCells(this.cells.length, this.noContinuous)
      }
    },
    handlePrint (printDeviceName) {
      this.$refs.printer.print(this.isShowWindow, printDeviceName)
    },
    handleIsShowWindow (flag) {
      this.isShowWindow = flag
    },
    handleCountChange (newVal) {
      this.count = newVal
      if (this.isContinous) {
        this.cells = this.getCells(newVal, this.continuous)
      } else {
        this.cells = this.getCells(newVal, this.noContinuous)
      }
      this.handleShuffle()
    },
    handleFontSizeChange (newVal) {
      this.fontSize = newVal
    }
  }
}
</script>
