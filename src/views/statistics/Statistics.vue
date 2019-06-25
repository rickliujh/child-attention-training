<template>
  <q-page padding>
    <q-scroll-area class="absolute-top fit q-pa-md">
      <!-- <h4 class="text-h4 text-blue-10 text-weight-bold q-mt-xs q-mb-lg">统计分析</h4> -->

      <q-card>
        <q-tabs
          v-model="tab"
          class="bg-blue-8 text-white"
          align="justify"
          narrow-indicator
        >
          <q-tab name="schulte" label="舒尔特表格"/>
          <q-tab name="schulte2" label="等待开发"/>
          <q-tab name="schulte3" label="等待开发"/>
        </q-tabs>

        <q-separator/>

        <q-tab-panels v-model="tab" animated class="bg-blue text-white">
          <q-tab-panel name="schulte" class="no-scroll">
            <schulte-statistic></schulte-statistic>
          </q-tab-panel>

          <q-tab-panel name="schulte2">
            <div class="text-h6">开发中</div>
            更多功能敬请期待...
          </q-tab-panel>

          <q-tab-panel name="schulte3">
            <div class="text-h6">开发中</div>
            更多功能敬请期待...
          </q-tab-panel>
        </q-tab-panels>
      </q-card>
    </q-scroll-area>
  </q-page>
</template>

<script>
import SchulteStatistic from './pages/SchulteStatistic'
export default {
  name: 'Statistics',
  components: {
    SchulteStatistic
  },
  data () {
    return {
      tab: 'schulte'
    }
  },
  methods: {}
}
</script>

<style lang="stylus" scoped></style>
