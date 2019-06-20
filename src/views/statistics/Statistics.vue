<template>
  <q-page padding>
    <q-card>
      <q-tabs
        v-model="tab"
        dense
        class="bg-grey-3 text-grey-7"
        active-color="primary"
      >
        <q-tab name="schulte" label="舒尔特表格"/>
        <q-tab name="schulte2" label="舒尔特表格2"/>
        <q-tab name="schulte3" label="舒尔特表格3"/>
      </q-tabs>

      <q-separator/>

      <q-tab-panels v-model="tab" animated class="bg-primary text-white">
        <q-tab-panel name="schulte">
          <schulte-statistic></schulte-statistic>
        </q-tab-panel>
        <q-tab-panel name="schulte2">
          <div class="text-h6">Schulte</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
        <q-tab-panel name="schulte3">
          <div class="text-h6">Schulte</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
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
  }
}
</script>

<style lang="stylus" scoped></style>
