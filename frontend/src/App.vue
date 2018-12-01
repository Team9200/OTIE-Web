<template>
  <v-app>
    <v-navigation-drawer fixed :mini-variant="miniVariant" :clipped="clipped" v-model="drawer" app>
      <v-list>
        <v-list-tile>
          <v-list-tile-title class="title">
            <span>OPEN</span>
            <span class="font-weight-light">TI</span>
          </v-list-tile-title>
        </v-list-tile>

        <v-list-tile ripple router :to="menu.to" v-for="(menu, i) in menus" :key="i">
          <v-list-tile-action>
            <v-icon v-text="menu.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="menu.title"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>


    <v-toolbar app>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="headline text-uppercase">
        <span>Open</span>
        <span class="font-weight-light">TI</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <!-- <v-btn
        flat
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
      >
        <span class="mr-2">Latest Release</span>
      </v-btn> -->
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data: () => ({
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      menus: [{
        icon: 'home',
        title: 'Home',
        to: '/'
      }, {
        icon: 'list',
        title: 'Board',
        to: '/board'
      }, {
        icon: 'info',
        title: 'Block',
        to: '/block'
      }]
    })
  }
</script>