<template>
  <q-page class="flex flex-center">
    <div>
      <h3 class="text-h3 text-weight-bold text">{{ $t("Home.title") }}</h3>
      <div class="text-subtitle1 text">{{ $t("Home.subtitle") }}</div>
    </div>
    <img class="logo" alt="Quasar logo" src="../../assets/brain_logo.jpg">
  </q-page>
</template>

<style></style>

<script>
export default {
  name: 'PageHome'
}
</script>

<style lang="stylus" scoped>
@import '../..\styles\quasar.variables.styl'

.text-h3
  margin-bottom 5px
  color $primary

.text
  text-align center

.logo
  width 40%
</style>
