<template>
  <q-page>
      <q-scroll-area class="absolute-top fit">
        <standard-training class="q-pa-md"></standard-training>
      </q-scroll-area>
  </q-page>
</template>

<script>
import StandardTraining from './pages/StandardTraining'
export default {
  name: 'Print',
  components: {
    StandardTraining
  }
}
</script>

<style lang="stylus" scoped></style>
