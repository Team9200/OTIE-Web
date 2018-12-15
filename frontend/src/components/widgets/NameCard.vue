<template>
<div class="name-card">
  <v-card  ref="card" :dark="dark" :img="cardBgImage">
    <v-card-media v-if="showTopNav">
      <v-layout row justify-space-between class="ma-0">
        <v-flex xs2 class="text-sm-right">
          <v-icon>more_vert</v-icon>
        </v-flex>
      </v-layout>

    </v-card-media v-if="storage != 0">    
    <v-card-text>
      <div class="layout ma-0 align-center" :class="computeCardLayout" style="height:80px">
        <v-avatar :size="computeAvatarSize" :color="color">
          <img v-bind:src="avatar.src" v-bind:alt="name" v-if="showAvatar">
          <span v-else class="white--text headline">{{ name.charAt(0) }}</span>
        </v-avatar>
      </div>
        <div class="first" style="top:25px;">이름 :&emsp;{{name}}</div>
        <div class="first" style="top:50px;">타입 :&emsp;{{jobTitle}}</div>
        <div class="first" style="top:75px;">국가 :&emsp;{{country}}</div>
        <div class="third" style="top:25px;">퍼블릭키 :&emsp;{{publickey}}</div>
        <div v-if="jobTitle == 'Collector'" class="second" style="top:25px;">주요 수집 태그 :&emsp;{{tag}}</div>
        <div v-if="jobTitle == 'Collector'" class="second" style="top:50px;">샘플 수집 횟수 :&emsp;{{count1}}</div>
        <div v-if="jobTitle == 'Collector'" class="second" style="top:75px;">희귀 샘플 수집 횟수 :&emsp;{{count2}}</div>

        <div v-if="jobTitle == 'Analyzer'" class="second" style="top:25px;">주요 분석 태그 :&emsp;{{tag}}</div>
        <div v-if="jobTitle == 'Analyzer'" class="second" style="top:50px;">인기 분석 횟수 :&emsp;{{count1}}</div>
        <div v-if="jobTitle == 'Analyzer'" class="second" style="top:75px;">분석 횟수 :&emsp;{{count2}}</div>

        <div v-if="jobTitle == 'Storage'" class="second" style="top:25px;">네트워크 상태 :&emsp;좋음</div>
        <div v-if="jobTitle == 'Storage'" class="second" style="top:50px;">제공 용량 :&emsp;{{storage}}</div>
        <div v-if="jobTitle == 'Storage'" class="second" style="top:75px;">남은 용량 :&emsp;{{remine / 1000}}</div>

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
    count1: {
      type: Number,
      default: 0
    },
    count2: {
      type: Number,
      default: 0
    },
    tag: {
      type: String,
      default: "Not yet"
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
    remine: {
      type: Number,
      default: 0
    },   
    storage: {
      type: Number,
      default: 0
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
  .first{
      position:absolute; 
      left:10%;
  }
  .second{
      position:absolute; 
      left:32%;
  } 
  .third{
      position:absolute; 
      left:54%;
  } 
</style>