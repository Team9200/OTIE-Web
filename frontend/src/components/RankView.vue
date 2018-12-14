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
        <tr @click="$router.push(`/profile?type=${props.item.nodetype}&name=${props.item.publickey}`)" style="cursor:pointer;">
        <td>{{ props.index +1 }}</td>
        <td><icon name="flag"></icon></td>
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.nodetype }}</td>
        <td>{{ props.item.contribution }}</td>
        <td class="text-xs-left"><country-flag :country="String(props.item.country).toLowerCase()" size='normal'/></td>
        <td class="text-xs-left"><v-progress-linear v-if="props.item.progress >= 0" :value="props.item.progress" height="5" :color="props.item.color"></v-progress-linear> </td>
        </tr>
      </template>
    </v-data-table>
   </v-container>
  </v-card>
</v-container>

</template>

<script>

  import CountryFlag from 'vue-country-flag'

  import {
      APIService
  } from '../api/APIService';
  import {
      forEach as ForEach
  } from 'p-iteration';

  const apiService = new APIService();

  export default {

    components: {
        CountryFlag
    },
    data: () => ({
     
      listHeader1: [

          {
            text: '#',
            align: 'left',
            sortable: false,
            value: 'id',
            width: '5%',
          },
          {
            text: '',
            align: 'left',
            sortable: false,
            value: 'id',
            width: '5%',
          }
          ,
          {
            text: '이름',
            align: 'left',
            sortable: false,
            value: 'name',
            width: '15%',
          },
          {
            text: '타입',
            align: 'left',
            sortable: false,
            value: 'nodetype',
            width: '15%',
          },
                    {
            text: '기여도',
            align: 'left',
            sortable: false,
            value: 'cotributionr',
            width: '15%',
          },
          { text: '국적', sortable: false, value: 'country',width: '15%', },
          { text: '소개글', sortable: false, value: 'content',width: '15%', },

     
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
          console.log(result);

        })
      } 
    },
    created() {

      this.init();

    }

  }

</script>
