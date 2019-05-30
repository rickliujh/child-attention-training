<template>
  <q-list class="q-ml-xs">
    <q-item>
      <q-item-section>
        <h5 class="q-mb-sm text-h5 text-weight-bold" style="opacity:0.6">舒尔特方格</h5>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <timer></timer>
      </q-item-section>
    </q-item>

    <q-item>
      <q-item-section>
        <tips></tips>
      </q-item-section>
    </q-item>

    <q-item-label header>方格设置</q-item-label>

    <q-item>
      <q-item-section>
        <q-select label="方格数" v-model="countSelect" :options="countOpts" map-options emit-value>
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
          <q-btn class="q-mr-sm" color="primary" icon="fitness_center" label="开始"/>
          <q-btn flat class="q-mr-md text-weight-bold" style="color: #c10015;" label="重新开始"/>
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
  data () {
    return {
      countSelect: 25,
      countOpts: Array.apply(null, { length: 24 }).map(function (_, index) {
        let rowCount = index + 2
        return {
          label: ` ${rowCount} × ${rowCount} `,
          value: rowCount * rowCount
        }
      })
    }
  }
}
</script>

<style lang="stylus"></style>
