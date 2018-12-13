<template>
  <v-app>
    <v-navigation-drawer v-if="isMobile || isTablet" style="width: 250px;" fixed :clipped="$vuetify.breakpoint.mdAndUp" v-model="drawer" app>
      <v-list>
        <v-list-tile v-if="isMobile || isTablet">
          <!-- <v-btn icon @click.native.stop="drawer = !drawer">
            <v-icon>menu</v-icon>
          </v-btn> -->
          <v-list-tile-title style="padding-top: 1.5px;" class="title">
            <span>OPEN</span>
            <span class="font-weight-light">TI</span>
            <sup style="font-size: 11px;">&nbsp;Beta</sup>
          </v-list-tile-title>
        </v-list-tile>
  
        <v-list-tile ripple router :to="menu.to" v-if="menu.visible" v-for="(menu, i) in menus" :key="i">
          <v-list-tile-action>
            <v-icon v-text="menu.icon"></v-icon>
          </v-list-tile-action>
          <v-list-tile-title v-text="menu.title"></v-list-tile-title>
        </v-list-tile>

        <v-divider v-if="isMobile"></v-divider>
        <v-list-tile @click="$router.push('/login')" v-if="isMobile && !$store.getters.isAuthenticated" ripple>
          <v-list-tile-action>
            <!-- TODO: Add icon -->
            <v-icon></v-icon>
          </v-list-tile-action>
          <v-list-tile-title>로그인</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="$router.push('/register')" v-if="isMobile && !$store.getters.isAuthenticated" ripple>
          <v-list-tile-action>
            <!-- TODO: Add icon -->
            <v-icon></v-icon>
          </v-list-tile-action>
          <v-list-tile-title>회원가입</v-list-tile-title>
        </v-list-tile>

        <v-list-tile @click="onClickLogout" v-if="isMobile && $store.getters.isAuthenticated" ripple>
          <v-list-tile-action>
            <!-- TODO: Add icon -->
            <v-icon></v-icon>
          </v-list-tile-action>
          <v-list-tile-title>로그아웃</v-list-tile-title>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  
  
    <v-toolbar color="white darken-3" :clipped-left="$vuetify.breakpoint.mdAndUp" app>
      <v-toolbar-side-icon v-if="isMobile || isTablet" @click.native.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title style="width: 240px;" class="headline text-uppercase">
        <span>Open</span>
        <span class="font-weight-light">TI</span>
        <sup style="font-size: 15px;">&nbsp;Beta</sup>
      </v-toolbar-title>

      <v-btn router :to="menu.to" v-if="!isMobile && menu.visible" v-for="(menu, i) in menus" :key="i" flat>
        <v-icon>{{ menu.icon }}</v-icon>
        &nbsp;&nbsp;
        <span>{{ menu.title }}</span>
      </v-btn>


      <!-- <v-text-field flat solo-inverted prepend-icon="search" style="padding-top: 10px;" label="검색 (ex. #tag, @analyzer, !hash)" class="hidden-sm-and-down"></v-text-field> -->
      <v-spacer></v-spacer>
      <v-btn v-if="!isMobile && !$store.getters.isAuthenticated" @click="$router.push('/login')" flat>
        <span>로그인</span>
      </v-btn>
      <v-btn v-if="!isMobile && !$store.getters.isAuthenticated" @click="$router.push('/register')" flat>
        <span>회원가입</span>
      </v-btn>

      <v-btn v-if="!isMobile && $store.getters.isAuthenticated" @click="$router.push('/mypage')" flat>
        <span>마이페이지</span>
      </v-btn>

      <v-btn v-if="!isMobile && $store.getters.isAuthenticated" @click="onClickLogout" flat>
        <span>로그아웃</span>
      </v-btn>
    </v-toolbar>
  
    <v-content>
      <router-view />
    </v-content>

    <v-fab-transition>
      <v-btn
        @click="$router.push('/write')"
        color="green"
        key="edit"
        fab
        fixed
        bottom
        right
      >
      <v-icon color="white">edit</v-icon>
      </v-btn>
    </v-fab-transition>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    components: {},
    data: () => ({
      drawer: false,
      fixed: false,
      isMobile: false,
      isTablet: false,
      menus: [{
          icon: 'home',
          title: '홈',
          to: '/',
          visible: true
        }, {
          icon: 'list',
          title: '보고서',
          to: '/recent',
          visible: true
        }, {
          icon: 'info',
          title: '블록',
          to: '/block',
          visible: true
        }, {
          icon: 'info',
          title: '상태',
          to: '/status',
          visible: true
        },
        {
          icon: 'info',
          title: '로그인',
          to: '/login',
          visible: false
        }
      ]
    }),
    methods: {
      onResize() {
        this.isMobile = window.innerWidth <= 950;
        this.isTablet = window.innerWidth >= 950 && window.innerWidth <= 1263;
      },
      onClickLogout() {
        this.$store.dispatch('LOGOUT').then(() => this.$router.push('/'))
      }
    },
    created() {},
    mounted() {
      this.onResize();
      window.addEventListener('resize', this.onResize, {
        passive: true
      });
  
      if (this.isMobile) {
        this.drawer = false;
      } else if (this.isTablet) {
        this.drawer = false;
      } else {
        this.drawer = false;
      }
    },
    beforeDestroy() {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', this.onResize, {
          passive: true
        })
      }
    },
    watch: {
      // isMobile: {
      //   handler(val) {
      //     if (!val) return
      //     if (val === false) this.drawer = false
      //   }
      // }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons');
  @import url('https://use.fontawesome.com/releases/v5.5.0/css/all.css');
  
  /* Global CSS */
</style>