<template>
  <v-layout>
    <v-container>
      <v-container>
        <br><br>
        <div style="text-align: center; font-size: 50px; padding-bottom: 10px;">
          <span>OPEN</span>
          <span class="font-weight-light">TI</span>
          <sup style="font-size: 25px;">&nbsp;Beta</sup>
        </div>

        <br><br><br><br>
        <v-text-field flat solo-inverted prepend-icon="search" @keyup.enter.native="enterKey" label="Search (ex. #tag, @node, !hash, title, contents)" class="hidden-sm-and-down"></v-text-field>

      </v-container>
    </v-container>
  </v-layout>
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
        return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() +
          ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      },
      enterKey() {
        if (window.event.keyCode == 13) {
 
             console.log(1);
        }
      }
    },
    created() {
      // this.getMalwares();
    }
  }
</script>

<style>

</style>