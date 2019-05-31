<template>
  <q-page padding>
    <q-select
      outlined
      v-model="select"
      :options="selectOptions"
      :label="$t('Settings.language')"
      map-options
      emit-value
    >
      <template v-slot:before>
        <q-icon name="language"></q-icon>
      </template>
    </q-select>
  </q-page>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
  name: 'Settings',
  data () {
    return {
      select: this.$i18n.locale,
      selectOptions: [
        {
          label: 'English(US)',
          value: 'en'
        },
        {
          label: '简体中文',
          value: 'cn'
        }
      ]
    }
  },
  methods: {
    ...mapMutations(['changeHeaderTitle'])
  },
  watch: {
    select (newValue, oldValue) {
      if (newValue !== oldValue) {
        this.$i18n.locale = newValue
        this.changeHeaderTitle(this.$t('Default.navigation.settings'))
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.title {
  margin-bottom: 10px;
}
</style>
