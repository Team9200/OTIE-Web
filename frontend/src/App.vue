<template>
  <v-app>
    <v-navigation-drawer style="width: 250px;" fixed :clipped="$vuetify.breakpoint.mdAndUp" v-model="drawer" app>
      <v-list>
        <!-- <v-list-tile v-if="device.mobile || device.tablet">
            <v-btn icon @click.native.stop="drawer = !drawer">
              <v-icon>menu</v-icon>
            </v-btn>
            <v-list-tile-title style="padding-top: 1.5px;" class="title">
              <span>OPEN</span>
              <span class="font-weight-light">TI</span>
            </v-list-tile-title>
          </v-list-tile> -->
  
        <v-list-tile ripple router :to="menu.to" v-for="(menu, i) in menus" :key="i">
          <v-list-tile-action>
            <v-icon v-text="menu.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="menu.title"></v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  
  
    <v-toolbar dark color="green darken-3" :clipped-left="$vuetify.breakpoint.mdAndUp" app>
      <v-toolbar-side-icon @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title style="width: 240px;" class="headline text-uppercase">
        <span>Open</span>
        <span class="font-weight-light">TI</span>
        <sup style="font-size: 15px;">&nbsp;Beta</sup>
      </v-toolbar-title>
      <v-text-field flat solo-inverted prepend-icon="search" style="padding-top: 10px;" label="Search (ex. #tag, @analyzer, !hash)" class="hidden-sm-and-down"></v-text-field>
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
      drawer: false,
      fixed: false,
      device: {
        mobile: false,
        tablet: false,
      },
      menus: [{
          icon: 'home',
          title: 'Home',
          to: '/'
        }, {
          icon: 'list',
          title: 'Recently',
          to: '/recent'
        },
        {
          icon: 'list',
          title: 'Popular',
          to: '/popular'
        }, {
          icon: 'info',
          title: 'Block',
          to: '/block'
        }, {
          icon: 'info',
          title: 'Status',
          to: '/status'
        }
      ]
    }),
    methods: {
      isMobile() {
        if (window.innerWidth <= 950) {
          return true;
        } else {
          return false;
        }
      },
      isTablet() {
        if (window.innerWidth >= 950 && window.innerWidth <= 1263) {
          return true;
        } else {
          return false;
        }
      },
      setValue(drawer, mobile, tablet) {
        this.drawer = drawer;
        this.mobile = mobile;
        this.tablet = tablet;
      }
    },
    created() {},
    mounted() {
      if (this.isMobile()) {
        this.setValue(false, true, false);
        // this.drawer = false;
        // this.device.mobile = true;
      } else if (this.isTablet()) {
        this.setValue(false, false, true);
        // this.drawer = false;
        // this.device.tablet = true;
      } else {
        this.setValue(true, false, false);
        // this.drawer = true;
        // this.device.mobile = false;
      }
    },
    watch: {}
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  @import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');
  
  /* Global CSS */
</style>