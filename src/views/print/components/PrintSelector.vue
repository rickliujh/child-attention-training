<template>
  <q-list class="q-ml-xs">
    <q-item-label header>主要设置</q-item-label>

    <q-item>
      <q-item-section>
        <q-select label="打印机" v-model="printSelect" :options="printOpts" map-options emit-value>
          <template v-slot:before>
            <q-icon name="local_printshop"></q-icon>
          </template>
          <template v-slot:hint>选择您系统中的打印机</template>
        </q-select>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-select label="方格数" v-model="countSelect" :options="countOpts" map-options emit-value>
          <template v-slot:before>
            <q-icon name="view_module"></q-icon>
          </template>
          <template v-slot:hint>选择打印题目的方格数量</template>
        </q-select>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <q-select
          label="字体大小"
          v-model="fontSizeSelect"
          :options="fontSizeOpts"
          map-options
          emit-value
        >
          <template v-slot:before>
            <q-icon name="font_download"></q-icon>
          </template>
          <template v-slot:hint>选择打印在方格中的字体大小</template>
        </q-select>
      </q-item-section>
    </q-item>

    <q-item-label header>其他设置</q-item-label>

    <q-item multiline tag="label">
      <q-item-section>
        <q-item-label>数字连续</q-item-label>
        <q-item-label caption>控制打印方格里的数字是否连续</q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-toggle v-model="isContinuous" @input="handleContinuousChange"></q-toggle>
      </q-item-section>
    </q-item>

    <q-item multiline tag="label">
      <q-item-section>
        <q-item-label>显示打印窗口</q-item-label>
        <q-item-label caption>控制打印时是否弹出系统打印窗口</q-item-label>
      </q-item-section>
      <q-item-section avatar>
        <q-toggle v-model="isShowSystemPrintWindow" @input="handleShowWindowChange"></q-toggle>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section class="btn">
        <q-btn flat class="q-mr-md text-weight-bold" style="color: #1976d2;" label="打乱" @click="handleShuffleBtnClick"/>
        <q-btn
          color="primary"
          icon-right="local_printshop"
          label="打印试题"
          @click="handlePrintBtnClick"
        />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'PrintSelector',
  data () {
    return {
      printSelect: '',
      printOpts: [],
      countSelect: 81,
      countOpts: Array.apply(null, { length: 24 }).map(function (_, index) {
        let rowCount = index + 2
        return {
          label: `${rowCount} × ${rowCount}`,
          value: rowCount * rowCount
        }
      }),
      fontSizeSelect: 15,
      fontSizeOpts: Array.apply(null, { length: 50 }).map(function (_, index) {
        return {
          label: `${index + 1}`,
          value: index + 1
        }
      }),
      isContinuous: false,
      isShowSystemPrintWindow: true
    }
  },
  computed: {
    ...mapState(['printerList'])
  },
  watch: {
    countSelect () {
      this.handleCountChange()
    },
    fontSizeSelect () {
      this.handleFontSizeChange()
    }
  },
  methods: {
    handlePrintBtnClick () {
      this.$emit('print', this.printSelect)
    },
    handleShuffleBtnClick () {
      this.$emit('shuffle')
    },
    handleContinuousChange (newVal) {
      this.$emit('is-continuous', newVal)
    },
    handleShowWindowChange (newVal) {
      this.$emit('isShow-window', newVal)
    },
    handleCountChange () {
      this.$emit('count-change', this.countSelect)
    },
    handleFontSizeChange () {
      this.$emit('fontSize-change', this.fontSizeSelect)
    }
  },
  mounted () {
    let res = []
    let list = this.printerList
    for (const key in list) {
      res[key] = {
        label: this.printerList[key].name,
        value: this.printerList[key].name
      }
    }
    this.printOpts = res
    this.printSelect = res[0].value
  }
}
</script>

<style lang="stylus" scoped>
.btn
  display inline-block
</style>
