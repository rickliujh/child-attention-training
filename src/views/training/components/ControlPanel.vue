<template>
  <q-list class="q-ml-xs">
    <q-item>
      <q-item-section>
        <h5 class="q-mb-sm text-h5 text-weight-bold" style="opacity:0.6">舒尔特方格</h5>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <timer ref="timer" :timing="isStart" :isReset="isReset"></timer>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <tips :isRight="isRight" :isReset="isReset"></tips>
      </q-item-section>
    </q-item>

    <q-item-label header>方格设置</q-item-label>

    <q-item>
      <q-item-section>
        <q-select
          label="方格数"
          v-model="countSelect"
          :options="countOpts"
          map-options
          emit-value
          @input="handleGridCountSelect"
        >
          <template v-slot:before>
            <q-icon name="view_module"></q-icon>
          </template>
        </q-select>
      </q-item-section>
    </q-item>

    <q-item-label header>操作</q-item-label>

    <q-item>
      <q-item-section>
        <div>
          <q-btn
            class="q-mr-sm"
            color="primary"
            icon="fitness_center"
            label="开始"
            :disable="isDisableStartBtn"
            @click="handleStartBtnClick"
          />
          <q-btn
            flat
            class="q-mr-md text-weight-bold"
            style="color: #c10015;"
            label="重置"
            @click="handleResetBtnClick"
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import Timer from './Timer'
import Tips from './Tips'
export default {
  name: 'ControlPanel',
  components: {
    Timer,
    Tips
  },
  props: {
    isRight: Boolean,
    isDone: Boolean
  },
  data () {
    return {
      countSelect: 25,
      countOpts: Array.apply(null, { length: 24 }).map(function (_, index) {
        let rowCount = index + 2
        return {
          label: ` ${rowCount} × ${rowCount} `,
          value: rowCount * rowCount
        }
      }),
      isStart: false,
      isReset: true,
      isDisableStartBtn: false
    }
  },
  watch: {
    isDone (newVal) {
      if (newVal === true) {
        this.isStart = false

        let totalTime = this.$refs.timer.timestamp / 1000
        this.$emit('total-time', totalTime)
      }
    }
  },
  methods: {
    handleGridCountSelect (value) {
      this.$emit('grid-count-change', value)
    },
    handleStartBtnClick () {
      this.$emit('start')
      this.isStart = true
      this.isDisableStartBtn = true
    },
    handleResetBtnClick () {
      this.$emit('reset')
      setTimeout(() => {
        this.isStart = false
        this.isReset = !this.isReset
        this.isDisableStartBtn = false
      }, 50)
    }
  }
}
</script>

<style lang="stylus"></style>
