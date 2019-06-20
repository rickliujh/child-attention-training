<template>
  <q-layout view="hHh lpr lff">
    <q-header elevated>
      <q-bar style="-webkit-app-region: drag;">
        <q-icon name="laptop_chromebook"/>
        <div>{{ $t('title') }}</div>

        <q-space/>

        <div style="-webkit-app-region: no-drag;">
          <q-btn dense flat icon="minimize" @click="minimizeWindows"/>
          <q-btn dense flat icon="crop_square" @click="toggleWindowMaximize"/>
          <q-btn dense flat icon="close" @click="closeWindow"/>
        </div>
      </q-bar>

      <q-toolbar round dense class="text-white shadow-2">
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
          icon="menu"
        />

        <q-toolbar-title>{{ this.headerTitle }}</q-toolbar-title>
        <q-btn flat round dense icon="more_vert"/>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" elevated content-class="bg-grey-3" :breakpoint="500">
      <q-scroll-area class="fit">
        <q-list>
          <q-item-label header>{{ $t("Default.navigation.title") }}</q-item-label>
          <q-item to="/" exact @click.native="handlePageClick($t('Default.navigation.home'))">
            <q-item-section avatar>
              <q-icon name="home"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('Default.navigation.home')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/training" @click.native="handlePageClick($t('Default.navigation.training'))">
            <q-item-section avatar>
              <q-icon name="golf_course"></q-icon>
              <!-- or fitness_center -->
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('Default.navigation.training')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/print" @click.native="handlePageClick($t('Default.navigation.print'))">
            <q-item-section avatar>
              <q-icon name="print"></q-icon>
              <!-- or local_printshop -->
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('Default.navigation.print')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item
            to="/statistics"
            @click.native="handlePageClick($t('Default.navigation.statistics'))"
          >
            <q-item-section avatar>
              <q-icon name="show_chart"></q-icon>
              <!-- or trending_up timeline-->
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('Default.navigation.statistics')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/settings" @click.native="handlePageClick($t('Default.navigation.settings'))">
            <q-item-section avatar>
              <q-icon name="settings"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('Default.navigation.settings')}}</q-item-label>
            </q-item-section>
          </q-item>
          <q-item to="/about" @click.native="handlePageClick($t('Default.navigation.about'))">
            <q-item-section avatar>
              <q-icon name="info_outline"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{$t('Default.navigation.about')}}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item-label header>
            {{
            $t("Default.essentialLinks.title")
            }}
          </q-item-label>
          <q-item to="/test">
            <q-item-section avatar>
              <q-icon name="info_outline"></q-icon>
            </q-item-section>
            <q-item-section>
              <q-item-label>Dev-Test</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" target="_blank" href="https://quasar.dev">
            <q-item-section avatar>
              <q-icon name="school"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Docs</q-item-label>
              <q-item-label caption>quasar.dev</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" target="_blank" href="https://github.com/quasarframework/">
            <q-item-section avatar>
              <q-icon name="code"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Github</q-item-label>
              <q-item-label caption>github.com/quasarframework</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" target="_blank" href="https://chat.quasar.dev">
            <q-item-section avatar>
              <q-icon name="chat"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Discord Chat Channel</q-item-label>
              <q-item-label caption>chat.quasar.dev</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" target="_blank" href="https://forum.quasar.dev">
            <q-item-section avatar>
              <q-icon name="forum"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Forum</q-item-label>
              <q-item-label caption>forum.quasar.dev</q-item-label>
            </q-item-section>
          </q-item>
          <q-item clickable tag="a" target="_blank" href="https://twitter.com/quasarframework">
            <q-item-section avatar>
              <q-icon name="rss_feed"/>
            </q-item-section>
            <q-item-section>
              <q-item-label>Twitter</q-item-label>
              <q-item-label caption>@quasarframework</q-item-label>
            </q-item-section>
          </q-item>
          <!-- <q-item @click.native="openURL('http://quasar-framework.org')">
          <q-item-side icon="school"/>
          <q-item-main :label="$t('Default.essentialLinks.docs')" sublabel="quasar-framework.org"></q-item-main>
        </q-item>
        <q-item @click.native="openURL('https://discord.gg/5TDhbDg')">
          <q-item-side icon="chat"/>
          <q-item-main
            :label="$t('Default.essentialLinks.discordChatChannel')"
            sublabel="https://discord.gg/5TDhbDg"
          ></q-item-main>
        </q-item>
        <q-item @click.native="openURL('http://forum.quasar-framework.org')">
          <q-item-side icon="forum"/>
          <q-item-main
            :label="$t('Default.essentialLinks.forum')"
            sublabel="forum.quasar-framework.org"
          ></q-item-main>
        </q-item>
        <q-item @click.native="openURL('https://twitter.com/quasarframework')">
          <q-item-side icon="rss feed"/>
          <q-item-main :label="$t('Default.essentialLinks.twitter')" sublabel="@quasarframework"></q-item-main>
          </q-item>-->
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'
import { mapState, mapMutations } from 'vuex'
import {
  getPrinterList,
  getPackageInfo,
  MainWindowManager
} from '../electron/renderer/ipc'

export default {
  name: 'LayoutDefault',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  computed: {
    ...mapState(['headerTitle'])
  },
  methods: {
    openURL,
    ...mapMutations(['changeHeaderTitle']),
    ...mapMutations(['updatePrinterList']),
    ...mapMutations(['setVersion']),
    handlePageClick (pageTitle) {
      this.changeHeaderTitle(pageTitle)
      // this.leftDrawerOpen = false
    },
    minimizeWindows () {
      MainWindowManager.minimizeMainWindow()
    },
    toggleWindowMaximize () {
      MainWindowManager.maximizeMainWindow()
    },
    closeWindow () {
      MainWindowManager.closeMainWindow()
    }
  },
  created () {
    this.changeHeaderTitle(this.$t('Default.navigation.home'))
  },
  mounted () {
    this.setVersion(getPackageInfo().version)
    getPrinterList().then(res => {
      this.updatePrinterList(res)
    })
  }
}
</script>

<style></style>
