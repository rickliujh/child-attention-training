<template>
  <q-page>
    <!-- <div class="row inline items-center">
      <img class="logo" alt="Quasar logo" src="../../assets/brain_logo.jpg">
      <div>
        <h3 class="text-h3 text-weight-bold text">{{ $t("Home.title") }}</h3>
        <div class="text-subtitle1 text">{{ $t("Home.subtitle") }}</div>
      </div>
    </div> -->
    <q-carousel class="absolute-top fit" arrows animated v-model="slide" height="100%" :autoplay="5000" infinite>
      <q-carousel-slide name="first">
        <img class="absolute-top full-width" src="../../assets/child.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">{{ $t("Home.title") }}</div>
          <div class="text-subtitle1">{{ $t("Home.subtitle") }}</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="second">
        <img class="absolute-top full-width" src="../../assets/training2.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Training Games</div>
          <div class="text-subtitle1">Effectively improve attention</div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide name="third">
        <img class="absolute-top full-width" src="../../assets/print.jpg">
        <div class="absolute-bottom custom-caption">
          <div class="text-h2">Print Games</div>
          <div class="text-subtitle1">Off the electronic device</div>
        </div>
      </q-carousel-slide>
    </q-carousel>
    <!-- <img class="logo" alt="Quasar logo" src="../../assets/brain_logo.jpg"> -->
  </q-page>
</template>

<style></style>

<script>
export default {
  name: 'PageHome',
  data () {
    return {
      slide: 'first'
    }
  }
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
  width 10%

.custom-caption
  text-align center
  padding 12px
  color white
  background-color rgba(0, 0, 0, 0.3)
</style>
