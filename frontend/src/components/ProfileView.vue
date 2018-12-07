<template>
  <div id="pageDashboard">
    <v-container grid-list-xl fluid>
      <v-layout row wrap>

        <v-flex v-if="monthActivity.length >= 1" lg8 sm12 xs12>
          <v-widget title="Monthly activities" content-bg="white">
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

        <v-flex v-if="tag.length >= 1" lg4 sm12 xs12>
          <v-widget title="Tag" content-bg="white">
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
                height="400px"
                width="100%"
                >
                </e-chart>     
            </div>
          </v-widget>  
        </v-flex>

        <!-- acitivity/chat widget -->

        <v-flex v-if="activity.length >= 1" lg6 sm12 xs12>
          <chat-window height="308px"></chat-window>
        </v-flex>
        <v-flex v-if="activity.length >= 1" lg6 sm12 xs12>
          <v-widget title="Activities" contentBg="white">
            <div slot="widget-content">
              <ol class="timeline timeline-activity timeline-point-sm timeline-content-right">
                <li class="timeline-block" v-for="(item, index) in activity" :key="index">
                  <div class="timeline-point">
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

        <!-- Popular post start -->

        <v-flex v-if="activity.length >= 1" lg7 sm12 xs12>
          <v-card>
            <v-toolbar card dense color="transparent">
              <v-toolbar-title><h4>Popular post</h4></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <template>
                <v-data-table
                  :headers="Ppheaders"
                  :items="Ppdata"
                  class="elevation-0"
                >
                  <template slot="items" slot-scope="props">
                    
                    <td>{{ props.item.id }}</td>
                    <td>{{ props.item.subject }}</td>
                    <td class="text-xs-left">{{ props.item.date}}</td>
                    <td class="text-xs-left"><v-progress-linear :value="props.item.progress" height="5" :color="props.item.color"></v-progress-linear> </td>
                
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
              <v-toolbar-title><h4>Post</h4></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon>more_vert</v-icon>
              </v-btn>      
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <template>
                <v-data-table
                  :headers="Pheaders"
                  :items="Pdata"
                  class="elevation-0 table-striped"
                >
                  <template slot="items" slot-scope="props">

                    <td>{{ props.item.id }}</td>
                    <td class="text-xs-left">{{ props.item.subject }}</td>
                    <td class="text-xs-left">{{ props.item.date }}</td>

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

const apiService = new APIService();

export default {

  components: {
    VWidget,
    ChatWindow,
    VCircle,
    EChart, 
  },
  data: () => ({

    color: Material,
    selectedTab: 'tab-1',
    nodeType: [],
    monthActivity: [],
    tag: [], 
    activity: [],
    Ppheaders: [

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
    Ppdata: [
      {
        id: '1',
        subject: 'Template PSD',
        date: '2018-12-07 13:06:54',
        progress: 90,
        color: 'pink',
      },
      {
        id: '2',    
        subject: 'Logo Design',
        date: '2018-12-07 13:06:54',
        progress: 70,
        color: 'success'
      },
      {
        id: '3',    
        subject: 'REST API',
        date: '2018-12-07 13:06:54',
        progress: 50,
        color: 'info'
      },
      {
        id: '4',    
        subject: 'API Unit Test',
        date: '2018-12-07 13:06:54',
        progress: 30,
        color: 'teal'
      },
      {
        id: '5',    
        subject: 'Project Deploy',
        date: '2018-12-07 13:06:54',
        progress: 15,
        color: 'grey'
      },

    ],
    Pheaders: [

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
    Pdata: [
      {
        id: '1',
        subject: 'Template PSD',
        date: '2018-12-07 13:06:54',
      },
      {
        id: '2',    
        subject: 'Logo Design',
        date: '2018-12-07 13:06:54',
      },
      {
        id: '3',    
        subject: 'REST API',
        date: '2018-12-07 13:06:54',
      },
      {
        id: '4',    
        subject: 'API Unit Test',
        date: '2018-12-07 13:06:54',
      },
      {
        id: '5',    
        subject: 'Project Deploy',
        date: '2018-12-07 13:06:54',
      },

    ],
  }),
  computed: {

  },
  methods: {

    init () {

      const name = this.$route.query.name;
      const type = this.$route.query.type;
      this.nodeType = type;

      apiService.searchNode(type, name)
        .then(response => {
          
          const malwareList = response.message;
          this.init_tagChart(malwareList);
          this.init_mActive(malwareList);
          this.init_Active(malwareList);
        
        });
      
    },
    init_tagChart (malwareList) {

      let tag = {};
      let total = 0;
      
      malwareList.forEach(function (data, i) {

        total += data.tag_name_etc.length;
        
        data.tag_name_etc.map(function (out) {

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

      let etc = { 'value': total - other, 'name': 'other' };
      last.push(etc);

      this.tag = last;
      console.log('Created Tag Chart.');

    },
    init_mActive (malwareList) {

      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      let post = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

      malwareList.forEach(function (data) {

        let tmp = {};
        let date = new Date(data.date);

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
        const date = new Date(data.date).getTime();
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
        tmp.text = data.azid;       // 내용
        result.push(tmp);

      });

      this.activity = result;
      console.log('created activity chart');

    }
  },
  created: function () {

    this.init();
   
  }

};
</script>
<style>
  .timeline-point-sm .timeline-point {
      width: 64px;
  }

  .timeline-point {
    position: relative;
    -ms-flex-negative: 0;
    flex-shrink: 0;
    -webkit-box-flex: 0;
    -ms-flex-positive: 0;
    flex-grow: 0;
    -webkit-box-ordinal-group: 3;
    -ms-flex-order: 2;
    order: 2;
    width: 96px;
    padding-bottom: 30px;
    text-align: center;
}
  .timeline-point::before {
    content: '';
    position: absolute;
    top: 9px;
    left: 50%;
    bottom: -9px;
    width: 1px;
    margin-left: -1px;
    z-index: -1;
    background-color: #ebebeb;
}
  ::before, ::after {
    text-decoration: inherit;
    vertical-align: inherit;
}
*, ::before, ::after {
    -webkit-box-sizing: inherit;
    box-sizing: inherit;
}
  .timeline .timeline-block:first-child .timeline-point::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    display: inline-block;
    width: 4px;
    height: 4px;
    margin-left: -2px;
    border-radius: 50%;
}
  div {
    display: block;
}
  .timeline {
    position: relative;
    list-style: none;
    padding-left: 0;
    z-index: 1;
}
  ol {
    display: block;
    list-style-type: decimal;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    padding-inline-start: 40px;
}
  .theme--light .v-card, .application .theme--light.v-card {
    background-color: #fff;
    color: rgba(0,0,0,0.87);
}
  .layout.row {
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
}
  .application--wrap {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 auto;
    flex: 1 1 auto;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    min-height: 100vh;
    max-width: 100%;
    position: relative;
}
::selection {
    background-color: #b3d4fc;
    color: #000;
    text-shadow: none;
}
  .timeline-block {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}
  li {
    display: list-item;
    text-align: -webkit-match-parent;
}
  .timeline {
    position: relative;
    list-style: none;
    padding-left: 0;
    z-index: 1;
}
  .application.theme--light {
    background: #fafafa;
    color: rgba(0,0,0,0.87);
}
  .application {
    font-family: 'Roboto', sans-serif;
    line-height: 1.5;
}
  .timeline-point-sm .timeline-point {
    width: 64px;
}
  .v-card > *:last-child:not(.v-btn):not(.v-chip) {
    border-bottom-left-radius: inherit;
    border-bottom-right-radius: inherit;
}
  .v-card__text {
    padding: 16px;
    width: 100%;
}
  .white {
    background-color: #fff !important;
    border-color: #fff !important;
}
  * {
    background-repeat: no-repeat;
    padding: 0;
    margin: 0;
}
  .timeline.timeline-content-right .timeline-block .timeline-content {
    -webkit-box-ordinal-group: 4;
    -ms-flex-order: 3;
    order: 3;
}
  .timeline.timeline-activity .timeline-content {
    margin-bottom: 7px;
}
  .timeline-content {
    -webkit-box-flex: 1;
    -ms-flex: 1 1 0%;
    flex: 1 1 0%;
    margin-bottom: 60px;
}
</style>