<template>
  <div>
    <q-card :class="cardCss">
      <q-card-section>
        <div class="tips">
          <q-icon class="q-mr-sm" size="20px" :name="cardIcon"></q-icon>
          <span class="text-subtitle1 text-weight-medium">{{tips}}</span>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
export default {
  name: 'Tips',
  props: {
    isReset: Boolean,
    isRight: Boolean
  },
  data () {
    return {
      tips: '请开始训练',
      cardCss: ['bg-grey', 'text-white'],
      cardIcon: 'bar_chart'
    }
  },
  watch: {
    isReset (newVal) {
      this.reset()
    },
    isRight (newVal) {
      if (newVal === true) {
        this.right()
      } else {
        this.wrong()
      }
    }
  },
  methods: {
    reset () {
      this.tips = '请开始训练'
      this.cardCss[0] = 'bg-grey'
      this.cardIcon = 'bar_chart'
    },
    right () {
      this.tips = '正确！'
      this.cardCss[0] = 'bg-blue'
      this.cardIcon = 'check'
    },
    wrong () {
      this.tips = '错误！'
      this.cardCss[0] = 'bg-red'
      this.cardIcon = 'close'
    }
  }
}
</script>

<style lang="stylus" scoped>
.tips
  display flex
  align-items center
</style>
