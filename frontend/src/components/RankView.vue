<template>
  <v-data-table
    :headers="listHeader1"
    :items="listData1"
    class="elevation-0"
  >
    <template slot="items" slot-scope="props">
      <tr @click="$router.push(`/post/${props.item.publickey}`)">
      <td>{{ props.item.id }}</td>
      <td>{{ props.item.subject }}</td>
      <td class="text-xs-left">{{ props.item.date}}</td>
      <td class="text-xs-left"><v-progress-linear v-if="props.item.progress >= 0" :value="props.item.progress" height="5" :color="props.item.color"></v-progress-linear> </td>
      </tr>
    </template>
  </v-data-table>
</template>

<script>
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
  }

</script>
