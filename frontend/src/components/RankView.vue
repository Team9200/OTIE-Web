<template>
<v-container>
  <v-card>
    <v-container v-if="listData1.length !== 0">
      <v-data-table
        :headers="listHeader1"
        :items="listData1"
        class="elevation-0"
      >
      <template slot="items" slot-scope="props">
        <tr @click="$router.push(`/post/${props.item.publickey}`)" style="cursor:pointer;">
        <td>{{ props.index +1 }}</td>
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.contribution }}</td>
        <td class="text-xs-left">{{ props.item.date}}</td>
        <td class="text-xs-left"><v-progress-linear v-if="props.item.progress >= 0" :value="props.item.progress" height="5" :color="props.item.color"></v-progress-linear> </td>
        </tr>
      </template>
    </v-data-table>
   </v-container>
  </v-card>
</v-container>

</template>

<script>


  import {
      APIService
  } from '../api/APIService';
  import {
      forEach as ForEach
  } from 'p-iteration';

  const apiService = new APIService();

  export default {
    
    data: () => ({
     
      listHeader1: [

          {
            text: '#',
            align: 'left',
            sortable: false,
            value: 'id'
          },
          {
            text: 'Username',
            align: 'left',
            sortable: false,
            value: 'name'
          },
                    {
            text: 'cotribution',
            align: 'left',
            sortable: false,
            value: 'number'
          },
          { text: 'Date', sortable: false, value: 'date' },
          { text: 'Grade', sortable: false, value: 'progress' },
     
      ],
      listData1: [{},{},{},{},{}]
    }),
    methods: {

      async init() {

        function compare(a,b) {
          if (a.contribution< b.contribution)
            return -1;
          if (a.contribution > b.contribution)
            return 1;
          return 0;
        }
        await apiService.getUser().then(async (user) =>{

          let result =  user.message.sort(compare).reverse();
          this.listData1 = result;

        })
      } 
    },
    created() {

      this.init();

    }

  }

</script>
