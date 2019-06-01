<template>
  <q-page>
    <q-scroll-area class="absolute-top fit">
      <q-list padding class="q-ml-md">
        <q-item>
          <q-item-section>
            <h1 class="q-mb-md text-h3">{{ $t("About.aboutAuthor.title") }}</h1>
            <div class="text-subtitle2 text-weight-bold">{{ $t("About.aboutAuthor.author.title") }}</div>
            <p class="q-mb-md text-body2">{{ $t("About.aboutAuthor.author.content") }}</p>
            <div class="text-subtitle2 text-weight-bold">{{ $t("About.aboutAuthor.eMail.title") }}</div>
            <p class="q-mb-md text-body2">{{ $t("About.aboutAuthor.eMail.content") }}</p>
            <div class="text-subtitle2 text-weight-bold">{{ $t("About.aboutAuthor.github.title") }}</div>
            <p class="q-mb-md text-body2">{{ $t("About.aboutAuthor.github.content") }}</p>
          </q-item-section>
        </q-item>

        <q-item>
          <q-item-section>
            <h1 class="q-mb-md text-h3">{{ $t("About.aboutProgram.title") }}</h1>
            <div
              class="text-subtitle2 text-weight-bold"
            >{{ $t("About.aboutProgram.version.title") }}</div>
            <p
              class="q-mb-md text-body2"
            >{{ $t("About.aboutProgram.version.content") }}{{this.$store.state.version}}</p>
            <div
              class="text-subtitle2 text-weight-bold"
            >{{ $t("About.aboutProgram.introduction.title") }}</div>
            <p class="q-mb-md text-body2">{{ $t("About.aboutProgram.introduction.content") }}</p>
          </q-item-section>
        </q-item>
        <!-- <blockquote class="block">
          <p class="q-mb-md text-h6">{{ $t("About.end.say") }}</p>
          <small>{{ $t("About.end.name") }}</small>
        </blockquote>-->
      </q-list>
    </q-scroll-area>
  </q-page>
</template>

<script>
export default {
  name: 'PageAbout'
}
</script>

<style lang="stylus" scoped>

.block
  margin-top 3%

.q-mb-md
  padding-right 10%
</style>
