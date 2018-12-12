<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex v-if="activity.length >= 1" lg12 sm12 v-for="(item,index) in user" :key=" 'mini' + index">
          <name-card
            mini
            v-bind="item"
          >
          </name-card>
        </v-flex>

        <v-flex v-if="monthActivity.length >= 1" lg8 sm12 xs12>
          <v-widget title="Monthly activities" content-bg="white">n
            <div slot="widget-content">
                <e-chart 
                :path-option="[
                  ['dataset.source', monthActivity],
                  ['color', [ color.green.lighten1 ]],
                  ['legend.show', true],
                  ['xAxis.axisLabel.show', true],
                  ['yAxis.axisLabel.show', true],
                  ['grid.left', '2%'],
                  ['grid.bottom', '5%'],
                  ['grid.right', '3%'],
                  ['series[0].type', 'bar'],
                  ['series[0].areaStyle', {}],
                  ['series[0].smooth', true],
                ]"

                height="400px"
                width="100%"
                >
                </e-chart> 
            </div>
          </v-widget>  
        </v-flex>

         <v-flex v-if="activity.length >= 1" lg4 sm12 xs12>
          <v-widget title="Activities" contentBg="white">
            <div slot="widget-content" style="height:385px;">
              <ol class="timeline timeline-activity timeline-point-sm timeline-content-right">
                <li class="timeline-block" v-for="(item, index) in activity" :key="index" @click="locationPost">
                  <div class="timeline-point" :id="index">
                    <v-circle dot large :color="item.color"></v-circle>
                  </div>
                  <div class="timeline-content">
                    <time datetime="2018" class="subheading">{{item.timeString}}</time>
                    <div class="py-2 text--secondary" v-html="item.text"></div>
                  </div>
                </li>
              </ol>              
            </div>
          </v-widget>          
        </v-flex>

        <!-- acitivity/chat widget -->

        <v-flex v-if="activity.length >= 1" lg6 sm12 xs12>
          <chat-window height="308px"></chat-window>
        </v-flex>
        <v-flex v-if="tag.length >= 1" lg6 sm12 xs12>
          <v-widget title="Category" content-bg="white">
            <div slot="widget-content">
                <e-chart 
                :path-option="[
                  ['dataset.source', tag],
                  ['legend.bottom', '0'],
                  ['color', [color.lightBlue.base, color.indigo.base, color.pink.base, color.green.base, color.cyan.base, color.teal.base]],
                  ['xAxis.show', false],
                  ['yAxis.show', false],
                  ['series[0].type', 'pie'],
                  ['series[0].avoidLabelOverlap', true],         
                  ['series[0].radius', ['50%', '70%']],                      
                ]"
                @click="location"
                height="367px"
                width="100%"
                class="center"
                >
                </e-chart>     
            </div>
          </v-widget>  
        </v-flex>

        <!-- Popular post start -->

        <v-flex v-if="activity.length >= 1" lg7 sm12 xs12>
          <v-card>
            <v-toolbar card dense color="transparent">
              <v-toolbar-title>

              <h4 v-if="nodeType === 'analyzer' ">Popular post</h4>
              <h4 v-else-if="nodeType === 'collector'">Unique sample</h4>

              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <template>
                <v-data-table
                  :headers="listHeader1"
                  :items="listData1"
                  class="elevation-0"
                >
                  <template slot="items" slot-scope="props">
                    <tr @click="$router.push(`/post/${props.item.permlink}`)">
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.subject }}</td>
                    <td class="text-xs-left">{{ props.item.date}}</td>
                    <td class="text-xs-left"><v-progress-linear v-if="props.item.progress >= 0" :value="props.item.progress" height="5" :color="props.item.color"></v-progress-linear> </td>
                    </tr>
                  </template>
                </v-data-table>
              </template>
              <v-divider></v-divider>
            </v-card-text>
          </v-card>
        </v-flex>
        <!-- end -->

        <!-- Post start -->
        <v-flex v-if="activity.length >= 1" lg5 sm12 xs12>

           <v-card>
            <v-toolbar card dense color="transparent">
              <v-toolbar-title>
              <h4 v-if="nodeType === 'analyzer' ">Post</h4>
              <h4 v-else-if="nodeType === 'collector'">Sample</h4>
              </v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>      
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <template>
                <v-data-table
                  :headers="listHeader2"
                  :items="listData2"
                  class="elevation-0 table-striped"
                >
                  <template slot="items" slot-scope="props">
                  <tr @click="$router.push(`/post/${props.item.permlink}`)">

                    <td>{{ props.item.id }}</td>
                    <td class="text-xs-left">{{ props.item.subject }}</td>
                    <td class="text-xs-left">{{ props.item.date }}</td>
                  </tr>
                  </template>
                </v-data-table>
              </template>
              <v-divider></v-divider>
            </v-card-text>
          </v-card>

        </v-flex>

      </v-layout>
    </v-container>
  </div>
</template>

<script>

import { APIService } from '../api/APIService';
import EChart from './chart/echart';                             // used -> done
import VWidget from './VWidget';                                 // used -> done
import Material from 'vuetify/es5/util/colors';                             // used -> done
import VCircle from './circle/VCircle';                          // used -> done
import ChatWindow from './chat/ChatWindow';                      // used    
import NameCard from './widgets/NameCard';

const apiService = new APIService();

export default {

  components: {
    VWidget,
    ChatWindow,
    VCircle,
    EChart, 
    NameCard
  },
  data: () => ({

    color: Material,
    selectedTab: 'tab-1',
    user: [],
    users: [
      {
        jobTitle: 'Analyzer',
        name: 'Michael Wang',
        avatar: {
          src: 'https://randomuser.me/api/portraits/men/1.jpg',
          size: '36'
        },
        country: 'South korea',  
      }
    ],
    nodeType: [],
    monthActivity: [],
    tag: [], 
    activity: [],
    listHeader1: [

      {
        text: '#',
        align: 'left',
        sortable: false,
        value: 'id'
      },
      {
        text: 'Subject',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Date', sortable: false, value: 'date' },
      { text: 'Grade', sortable: false, value: 'progress' },
 
    ],
    listData1: [{},{},{},{},{}],
    listHeader2: [

      {
        text: '#',
        align: 'left',
        sortable: false,
        value: 'id'
      },
      {
        text: 'Subject',
        align: 'left',
        sortable: false,
        value: 'name'
      },
      { text: 'Date', sortable: false, value: 'date' },
 
    ],    
    listData2: [{},{},{},{},{}],
  }),
  computed: {

  },
  methods: {

    init () {

      const name = this.$route.query.name;
      const type = this.$route.query.type;
      this.nodeType = type;
      console.log(this.nodeType);

      if(type === 'Storage'){

      }
      else{
      
        apiService.searchNode(type, name)
          .then(response => {
            
            const malwareList = response.message;
            this.init_tagChart(malwareList);
            this.init_mActive(malwareList);
            this.init_Active(malwareList);
            this.init_List(malwareList);
            this.init_User()
          
          });
      }
    },
    init_User (type){

      const pub = this.$route.query.name;

      if(type === 'storage'){

        apiService.getStorage()

      }
      else{

        let tmp = {};
        apiService.searchUser(pub).then((user)=>{

          const data = user.message[0];
          tmp.jobTitle = data.nodetype;
          tmp.name = data.username;
          tmp.country = data.country;
          tmp.avatar = {};
          tmp.publickey = data.publickey;
          this.user.push(tmp);

        });
      }

    },
    init_tagChart (malwareList) {

      let tag = {};
      let total = 0;
      
      malwareList.forEach(function (data, i) {

        total += data.body.tag_name_etc.length;
        
        data.body.tag_name_etc.map(function (out) {

          const key = out.tag;

          if (!tag.hasOwnProperty(key)) {

            tag[key] = 1;

          }
          else {

            tag[key] += 1;

          }

          return 0;
        
        });

        return 0;

      });

      let result =  Object.keys(tag).sort(function (a, b) { return tag[a] - tag[b] }).reverse();
      result = Object.keys(result).slice(0, 5).map(key => ({ [key]: result[key] }));      // 5 개만 보여줌.
   
      let last = [];
      let other = 0;

      result.forEach(function (data, i) {

        let tmp = {}; 
        tmp.value = tag[data[i]];
        tmp.name = data[i];
        other += tag[data[i]];
        last.push(tmp);

      });

      if (total - other >= 1) {

        let etc = { 'value': total - other, 'name': 'other' };
        last.push(etc);

      }
      this.tag = last;
      console.log('Created Tag Chart.');

    },
    init_mActive (malwareList) {

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let post = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      malwareList.forEach(function (data) {

        let tmp = {};
        let date = new Date(data.body.date);

        post[date.getMonth()] += 1;

      });

      const result = months.map((m, i) => {
        return {
          'month': m,
          'post': post[i]
        };
      });

      this.monthActivity = result;
      console.log('created month activity chart');

    },
    init_Active (malwareList) {

      const list = malwareList.slice(0, 5);      
      const color = ['primary', 'teal', 'indigo', 'pink', 'cyan'];
      const now = new Date().getTime();
      let result = [];

      list.forEach(function (data, i) {

        let tmp = {};
        const date = new Date(data.body.date).getTime();
        const lapse = Math.ceil((now - date) / 1000 / 60);   // min

        if (lapse < 1) {

          tmp.timeString = 'Just now';      //  초 단위.

        }
        else if (lapse >= 1 && lapse < 60) {  // 분 단위.

          tmp.timeString = String(lapse) + ' min ago';

        }
        else if (lapse >= 60 && lapse < 60 * 24) {  // 시간 단위.

          tmp.timeString = String(Math.floor(lapse / 60)) + ' hour ago';

        }
        else if (lapse >= 60 * 24 && lapse < 60 * 24 * 30) {

          tmp.timeString = String(Math.floor(lapse / 60 / 24)) + ' day ago';

        }
        else if (lapse >= 60 * 24 * 30 && lapse < 60 * 24 * 30 * 12) {

          tmp.timeString = String(Math.floor(lapse / 60 / 24 / 30)) + ' month ago';

        }
        else if (lapse >= 60 * 24 * 30 * 12) {

          tmp.timeString = String(Math.floor(lapse / 60 / 24 / 30 / 12)) + ' year ago';

        }

        tmp.color = color[i];       // 색
        tmp.text = data.title.slice(0,40)+'....';       // 내용
        tmp.permlink = data.permlink;
        result.push(tmp);

      });
      if (result.length < 5) {

        for(let i=result.length; i<5;i++){

          result.push({'timeString':'ㅤ','color':color[i],'text':'ㅤ'});

        }

      }


      this.activity = result;
      console.log('created activity chart');

    },
    init_List (malwareList) {

      let result1 = [];
      let result2 = [];
      const gradeColor = ['grey','pink','teal','success','info'];

      malwareList.forEach(function (data, i) {

        let tmp1 = {};
        let tmp2 = {};

        tmp1.id = i;
        tmp1.subject = (data.title).slice(0,30)+'...';
        tmp1.date = new Date(data.body.date).toLocaleString();
        tmp1.progress = 50;
        tmp1.color = gradeColor[i];
        tmp1.permlink = data.permlink;
      
        tmp2.id = i;
        tmp2.subject = (data.title).slice(0,20)+'...';
        tmp2.date = new Date(data.body.date).toLocaleString();
        tmp2.permlink = data.permlink;
        result1.push(tmp1)
        result2.push(tmp2);

      });

      if( result1.length < 5 ){

        for(var i=result1.length; i < 5; i++){

          result1.push({});

        }
      }

      if( result2.length < 5 ){

        for(var i=result2.length; i < 5; i++){

          result2.push({});

        }
      }

      this.listData1 = result1;
      this.listData2 = result2;
      console.log("created List Data");

    },
    location (e) {

      const targetId = e.currentTarget;
      let tag = targetId.innerHTML.split('</span>')[1].split(':')[0];
      const name = this.user[0].name;

      if(tag == 'other'){
        tag = '';
      }
      location.href =  '/search?query=%23'+tag+'%26%26%40'+name;
    },
    locationPost(e){    //activity

      const target = e.currentTarget;
      const index = target.getElementsByTagName("div")[0].id;
      const permlink = this.activity[index].permlink;

      location.href="/post/"+permlink;
    },
    locationPop(e){

      console.log

    }
  },
  created: function () {

    this.init();
   
  }

};
</script>
<style lang="css">
  @import '../assets/css/profile.css';
</style>
<style>
    .timeline-block:hover {
        background-color: rgba(0, 0, 0, 0.12);
    }
</style>
