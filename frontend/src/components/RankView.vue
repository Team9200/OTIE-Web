<template>
<v-container>
  <v-card>
    <v-container v-if="listData1.length !== 0">
      <v-data-table
        :pagination.sync="page"
        :headers="listHeader1"
        :items="listData1"

      >
      <template slot="items" slot-scope="props">
        <tr @click="$router.push(`/profile?type=${props.item.nodetype}&name=${props.item.publickey}`)" style="cursor:pointer;">
        <td v-if="props.index < 3"><img :src="props.item.img" /></td>
        <td v-else style="text-align:center">{{ props.index +1 }}</td>
        <td><i class="icon material-icons">{{ props.item.icon}}</i><i>{{ props.item.r}}</i></td>
        <td>{{ props.item.username }}</td>
        <td>{{ props.item.nodetype }}</td>
        <td>{{ props.item.contribution }}</td>
        <td class="text-xs-left"><country-flag :country="String(props.item.country).toLowerCase()" size='normal'/></td>
        <td>안녕하세요.</td>
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
      
      page:{
        rowsPerPage: 100
      },
      listHeader1: [

          {
            text: '#',
            align: 'left',
            sortable: false,
            value: 'id',
            width: '5%',
          },
          {
            text: ' ',
            align: 'left',
            sortable: false,
            value: 'id',
            width: '6%',
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
          { text: '국가', sortable: false, value: 'country',width: '15%', },
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

          let result = user.message.sort(compare).reverse();
          let array = []; 
          let icon = ["arrow_drop_up","arrow_drop_up","remove","arrow_drop_up","arrow_drop_down","remove","arrow_drop_up","remove","arrow_drop_up","arrow_drop_down","remove","arrow_drop_up","arrow_drop_up","remove","remove","remove","arrow_drop_up","arrow_drop_down","remove","arrow_drop_down","remove","arrow_drop_up","remove","arrow_drop_up","arrow_drop_up","arrow_drop_down","remove","remove","remove"];
          let r= [2,1,'',2,3,'',2,'',1,1,'',3,1,'','','',5,3,'',3,'',2,'',1,1,4,'','',''] 
          let img = ["data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAvQAAAL0BHVrG+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQsSURBVFiFxZZPbFR1EMc/83vv7S4gLaUBSncrq9ZEoinGhEQPJnhAJZFQjCXxYLAxIVFKiwX0ImlMPIA1aUUvnCRyMakJhfDnoohCNDEaICYcBOwWuy2CoYBQlrd9v/HQFh/dZfctKfF72p2Z38xn5/125omqUk71Hf0bRGQnMK9s8ISuiOiWoZ7mPeUCZTpAQ2ffLFXvTVVpBxZPmueqSEscezRKdR9WobIXuDFpGlLVXfHr874c+GJFLhzrTj9s1XtfMCtQfUuDIAsgrvMb+fFfBz5/9WoUgOSmgydxglEruhzAqKZEzE6/+tp8YEdJAJTVSNCW/XTtT3cSbt5v1TMSpXhIwUhPc2bycybVceADFf1oOoApPCcpC5F+6ePtR+KPtB5LRIlV5SqQmm4vABB0UJF0uYQLNx6uGzP+qXzV1W2RAETTKIPT7QWPQJGMg5YEWLjxcJ3n5b8DFqnInCgARkgjZMoCABnFlASIObcXWeRrI8xVjXY1FNIgBQBF7gAZoCTA0K61p4d7m7dHqvyf0pO5SwMYJaO29CO4T6UlSgfGlYxI6Q7cL8C45MsDaHzWILCgobNvVtis407kOaBuXoA7I3bJO4dqgIdSN//+syzAxe4XbwJD2FhTyJx13GBZOC61uX+LIs3AumRH/6awT6yzDMhOffddvwn0/C+7N+Sn1yv2LwDVbivSk+zYv9UaHTYwjMpKoP9OEeSEWskCqCPn7k5gV4IZWfxuf1pEGowxnyjSXaxUwTICeOrDvtjoaLwDtBWoZ6JTl4Zrqp/QrhXjRaHvOhs7x8TmtMCgwJ5sTfVnxc4WBSgIWtfnJJPxb63VyyPzq1+/F8Rk8T5g3nDNqRe0q8uWzR0FAODhTQfqA0dPqvKD5Jz12d2vjIX9te1HqhLG3ws8Y0WfDy2imQEAaOg8mAyCoFeE1cCPCt8YQdTyEsJzCEcD175xsXvtpag5KwKYUnLzgeNgb4lwBkBVmoDb2d41qyrNVTHA5CI6n0j49ed3tFwDWNzet8CY2B+JhJ+askVVsV1QUp7rtwgcCRca2dVyGfg+l/NeqzRfRR1Ite2rFc/9WYRbxshA2BdY26iKeNhnB3qaI73QwL0G0T1kHWf57Lhb3/RYKhFYfTLsc4zh9NkLOT/vPw0ceyAAAHHP9Uf/GdPfL1wM7wqWputve66T9wuGbWlVfAcAbozlAhFtzfaukWzvGhGVt2/kciUn5IwCzKT+d4CK7wCA67rGiPNxeuuh7QDGlSrPOA4Ty+fBAEwMIH00CKyzdEnd7LraqtnAgil/zdw5/HXlemCRxrpt+85EHceR5kCqbV+tuuYswnVXTALBKRanShCozaHMSST8xihTMVIH1HPeQ/V4DF2PBqGXrUI5gI98lcvFOoGuGQFA9WWgyVcZjRQPqFITBeBfLmiyY4OkQQIAAAAASUVORK5CYII=","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAvQAAAL0BHVrG+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAR7SURBVFiFxZZNbFRVFMd/5743H4DSlgbbzkxlImAkmmKMGF0QcYEfiXwZMXFhkBiNH9DWBj8WmobEBVojI7phpdGNySxoGxAWalCMipqoMWEhVKaFaQuopaXA9E3fPS7a4rQznXlNSvyv5p177jm/e+6bc56oKpUUb+36Cbi7ouM0ybfZ1Ma1Fb1mAjS2pReohp5WlWagYdJcZZDVrti+IKlz6qw02OPAyKTprKrui4xUf3L6o3W5Ql935marodcEsw7VZ9T3swDiOr/74+PDZz587GIQgPjOg5dw+NuKrgEwqgkR87ZXNbwE2FMWAGUD4u/Ivr/l+2sBW7ushowESV4gf2Dv5szk70yipfsNFX2rMgCSsGjZk65sPhy56oytAhAxo2fe23iqEo0qFxESM+2mKD3aq0iyXLAxxhKKdCrSaa3+EGvpSlcEEE2i9M60F1VAkYyDlgXo27e5B0gCLH89XZXLhfvrWrvrzqU2npttjxGSCJkiewnfjGLKAhSqZ8/WYSBvxC4o56eQVKQIoMQ7QAa4v1wwEaShufNZEVkyaYoEYE0CXTONRRUwSkZt+SuItXTfKiKpiVORRKRjsLr6bCUACVKBcSVjDGUB8I3g+CP9qU3PV0g6DWBc8kUARRXQyIJeYGljW7rwTlXHnWt9wJHxPBCS3UdLXSHq5gW41mKXvXioBrghcfmvMxUBBjsevAycxYabCsxZx/VXTz1M/guysaGLx+OtXUfirV1H6lq766bWxTqrgezUs+d6TaA9P+9/Lj8zX8kToNphRfbGW7p2WaP9BvpRWQ90TrmEh6vu8WqG1+PLIgAJR0f/C2DXgxloeLkzKSKNxph3FekolapoGAHcsTsdHhqKtIBuB2JMVOp8f03Vbdq+brwk9LS94VNANWCBXoGPszVVH5TaWxKgyOmJtBOPR760Vi8MLKl6cjaIyeRpoLq/5tcHtL3dVowdBADg5p3dMd/RX1T5RnLOtuz+R68Urtc2H14cNd6nwF1WdG3BIJofAIDGtoNx3/dTImwAvlP4wgiilocQ7kP4ynftU4MdW84HjTkngCnFW7uPgb0qwgkAVWkCxrKpTY/MNdacAW566fP6UCjfE416sck5QENzeqkx4T+jUS8xZQuqUsOorEKut1XgcGGigX1bLwBf53Khx+cab04VSOw4UCsh90cRrhojpwvXfGtXqCIh7L2n924O9OkGszWiWWQdZ83CiBtrWp6I+lZvL1xzjOG3k305L+/dCRy9LgAAkZDrDV26on/0DU6b/6uSsbGQ6+S9omZbXnN+BwBGr+R8Ed2eTW2SbGqTiMoLo7lc2Q45rwDzqf8dYM7vAIDrusaI805y16E3AYwri0PGcZgYPtcHYKIB6S2+b51Vy+oX1tcuXggsnVqvuXER5/4Z8S2yov6VAyeCtuNAfSCx40CtuuYkwogrJorglPJTxffV5lAWRaPeiiBdMVAFNOS8iuqxMLoN9Qs+torlAB7yWS4XbgPa5wUA1YeBJk9lKJA/oEpNEIB/AYPX1K2WOxRUAAAAAElFTkSuQmCC","data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAvQAAAL0BHVrG+gAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAR8SURBVFiFxZZbaFxVFIa/tc+ZS1LbJA21aWZiB1vBoqQiFvRBrA9VC72kYkQfpBah3tokxnp5UILgQ2ukidWXimCxL8KATUJroWhRC95QqggVbGMmbSfpRZq2pu3kTM5ePuTCJDOZOYEUfxiYs/baa31n7c1aR1SVUqpt7toqIruAypLOY7okoq+e7WjYV8pRpgPUtSbLVEPPqkoTsGTcPF9FGiPYo0Gye7AWlf3A8LjprKruiVyt/Kzv09WZXF93+maroTcEsxrV59T30wDiOn+QHf2176PHLwcBiG0/eBzHH7KiqwCMalzE7PIqriwEdhYFQFmP+NvSH2z6YTJgS7fVkJEgyXPkD3Y0pMb/p+LNPW+p6LulAZC4RYu+6R1NhyM3nJEVACJm+MzuDadK0ahyGSE+3W7y0qP9iiSKBRthJK5IlyJd1uqPtc3dyZIAogmU/un2vAooknLQogCn9zT0AgmAZW8mKzKZ8MDilp7F5zs3nJ9pjxESCKk8ewHflGKKAuSqd2fjFSBrxJYV81NIKJIHUOAOkAIeKhasrjW50Nrw1hxTpDQqCaB7ujGvAkZJqS1+BJ6NhMbeaOxXKE4hAAlSgVElZQxFAcbP+oWJ51hL91NBAEYlmweQR66Rsn5gUV1rMvdMVUedgn3gvuc/DgGOK2520tnNCjDZYpe+dKgKuCV+7Z8z0/fnVeBc+yPXYi3dZ7HheuCncXPacf2VQB9AvOmLuBrnEwDKa2pE7Z9ndq9LT8QQ66xEdPLZc716g/T+sndrlmkqdAlBtd2KdMSau3dYowMGBlBZA3QBjJS5V8IZ9gEI/nBl1eiRqQHsGjCDS17pSohInTHmfUXaC6XKG0YAd7+TDA8NRZpBtwC1jB3VhYGqiju1bfVoQegpe8OnGJucFugX2Jeuqviw0N6CAHlOTyadWCzytbV6cXBhxdMzQYwnTwKVA1W/PaxtbbZk7CAAALdt76n1HT2uyneScTan9667nrte3XR4QdR4+4F7reiDOYNobgAA6loPxnzf7xRhPfC9wldGELU8ivAAwlHftc+ca990IWjMWQFMKNbScwzsDRFOAKhKPTCS7ty4draxZg1w68tf1oRC2d5o1KsdnwMsaUouMib8dzTqxSdsQRWkhU5RyPUaBQ7nJhrc03gR+DaTCT0x23izqkB824FqCbk/i3DDGOnLXfOtXa6KhLD393U0BPp0g5ka0QyyjrOqPOLW1i+LR32rd+WuOcbw+8nTGS/r3QN8c1MAACIh1xv697r+dfrclPm/IlE7EnKdrJfXbItr1ncAYPh6xhfRLenOjZLu3Cii8uJwJlO0Q84pwFzqfweY9R0AcF3XGHHeS+w49DaAcWVByDgOY8Pn5gCMNSC93fets2JpTXlN9YJyYNHEetX8eZy/dNW3yPKa1w6cCNqOA/WB+LYD1eqakwhXXTFRBKeQnyq+rzaDMi8a9ZYH6YqBKqAh53VUj4XRzaif87GVLwfwkM8zmXAr0DYnAKg+BtR7KkOB/AFVqoIA/AeIjdeGmgISUwAAAABJRU5ErkJggg=="]


          result.forEach(function(data, index){
            let tmp = {};
            tmp.username = data.username;
            tmp.nodetype = data.nodetype
            tmp.contribution = data.contribution;
            tmp.country = data.country;
            tmp.icon = icon[index];
            tmp.r = r[index];
            if(index < 3){
            tmp.img = img[index]
            }
            array.push(tmp);

          });
          console.log(array)
          this.listData1 = array;
        })
      } 
    },
    created() {

      this.init();

    }

  }

</script>
