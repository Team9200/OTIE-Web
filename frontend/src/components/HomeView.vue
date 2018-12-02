<template>
  <v-container>
      <v-container>
        <div v-for="(malware, i) in malwares" :key="i">
          <v-card>
            <v-card-title>
              <v-item-group multiple>
                <v-chip color="green" text-color="white">
                  <v-avatar>
                    <v-icon>account_circle</v-icon>
                  </v-avatar>
                  {{ malware.analyzer }}
                </v-chip>
                <v-chip>{{ malware.filetype }}</v-chip>
                <v-chip>{{ malware.collector }}</v-chip>
                <v-chip>{{ getDate(malware.date) }}</v-chip>
                <!-- <v-chip v-if="k !== 'result'" v-for="(behavior, k) in malware.behavior" :key="k">{{ k }}</v-chip> -->
                <v-chip v-for="(tag, j) in malware.tag_name_etc" :key="j">#{{ tag.tag }}</v-chip>
                <v-chip>Details..</v-chip>
              </v-item-group>
            </v-card-title>
          </v-card>
          <br>
        </div>
      </v-container>
  </v-container>
</template>

<script>
  import {
    APIService
  } from '../api/APIService'
  const apiService = new APIService();
  
  export default {
    name: 'home-view',
    data: () => ({
      malwares: []
    }),
    methods: {
      getMalwares() {
        apiService.getMalwares()
          .then(response => {
            if (response.success === true) {
              this.malwares = response.message;
            } else {
              alert('데이터 로딩에 실패했습니다.');
            }
          })
          .catch(err => {
            if (err) throw err;
            alert('데이터 로딩에 실패했습니다.')
          })
      },
      getDate(value) {
        const date = new Date(value);
        return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() 
        + ' ' + date.getHours() + ':' + date.getMinutes() + ':'  + date.getSeconds();
      }
    },
    created() {
      this.getMalwares();
    }
  }
</script>

<style>
  
</style>