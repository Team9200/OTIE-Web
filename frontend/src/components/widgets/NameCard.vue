<template>
<div class="name-card">
  <v-card  ref="card" :dark="dark" :img="cardBgImage">
    <v-card-media v-if="showTopNav">
      <v-layout row justify-space-between class="ma-0">
        <v-flex xs2 class="text-sm-right">
          <v-icon>more_vert</v-icon>
        </v-flex>
      </v-layout>
    </v-card-media>    
    <v-card-text>
      <div class="layout ma-0 align-center" :class="computeCardLayout">
        <v-avatar :size="computeAvatarSize" :color="color">
          <img v-bind:src="avatar.src" v-bind:alt="name" v-if="showAvatar">
          <span v-else class="white--text headline">{{ name.charAt(0) }}</span>
        </v-avatar>
        <div class="flex text-xs-left" :class="computeTextAlgin">
          <div class="text-xs-left">
            <div>
              <div>&emsp;이름:&emsp;{{name}}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;공개키:&emsp;{{publickey}}</div>
              <v-btn class="right" flat icon color="grey">
                <v-icon>star</v-icon>
              </v-btn>
              <v-btn class="right" flat icon color="grey">
                <v-icon>favorite</v-icon>
              </v-btn>
            </div>
          </div>
          <div style="display:inline-block" class="left">
          <span class="left">&emsp;타입:&emsp;{{jobTitle}}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;총 분석횟수: 81</span><br>
          <span class="left">&emsp;국가:&emsp;{{country}}&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&emsp;&nbsp;&nbsp;&nbsp;&emsp;&emsp;&emsp;&emsp;&emsp;주 분야:&emsp;trojan</span>
          </div>
        </div>
      </div>
    </v-card-text>
  </v-card>
  <v-bottom-nav :value="true" color="transparent" :height="64" v-if="showBottomNav">
    <v-btn flat color="teal" value="recent">
      <span>Recent</span>
      <v-icon>history</v-icon>
    </v-btn>
    <v-btn flat color="teal" value="favorites">
      <span>Favorites</span>
      <v-icon>favorite</v-icon>
    </v-btn>
    <v-btn flat color="teal" value="nearby">
      <span>Nearby</span>
      <v-icon>place</v-icon>
    </v-btn>
  </v-bottom-nav>   
</div>
</template>

<script>
export default {
  props: {
    name: {
      type: String,
      default: ''
    },
    avatar: {
      type: Object,
      default: null
    },
    jobTitle: {
      type: String,
      default: ''
    },
    country: {
      type: String,
      default: ''
    },
    cardBgImage: {
      type: String,
    },
    color: {
      type: String,
      default: ''
    },
    dark: {
      type: Boolean,
      default: false
    },
    bottomNav: {
      type: Boolean,
      default: false
    },    
    topNav: {
      type: Boolean,
      default: false
    },      
    mini: {
      type: Boolean,
      default: false
    },
    publickey: {
      type: String,
      default: ''
    },   
  },
  data: () => ({

  }),
  
  computed: {
    computeCardLayout () {
      return (this.mini) ? 'row' : 'column';
    },
    computeTextAlgin () {
      return (this.mini) ? 'text-sm-right' : 'text-sm-center';
    },
    computeAvatarSize () {
      return (this.mini) ? '48' : '96';
    },
    showAvatar () {
      return this.avatar !== null && this.avatar.src;
    },

    showBottomNav () {
      return (this.mini === false && this.bottomNav); 
    },

    showTopNav () {
      return (this.mini === false && this.topNav); 
    }
  },

  methods: {

  },


};
</script>

<style lang="stylus" scoped>
  .caption, .subheading {
    font-weight:200;  
  }
</style>