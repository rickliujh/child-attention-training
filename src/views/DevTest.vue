<template>
  <q-page padding class="row items-start" v-show="true">
    <!-- <grid-view :grid="cells"></grid-view> -->
    <control-panel class="col-4"></control-panel>
  </q-page>
</template>

<script>
// import _ from 'underscore'
// import GridView from './training/components/GridView'
import ControlPanel from './training/components/ControlPanel'

export default {
  name: 'DevTest',
  components: {
    // GridView,
    ControlPanel
  },
  data () {
    return {
      cells: Array.apply(null, { length: 25 }).map((_, index) => {
        return {
          id: index,
          label: index + 1
        }
      })
    }
  },
  methods: {}
}
</script>

<style lang="stylus" scoped>
.my-card
  width 100%
  max-width 250px
</style>
