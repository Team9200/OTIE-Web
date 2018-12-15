<template>
    <v-container v-if="posts.length !== 0">
        <div v-for="(post, i) in posts" :key="i">
            <v-card style="cursor: pointer; overflow-y: auto;" id="post" @click="go(post)">
                <v-card-title>
                    <h3><u>{{ post.title.replace("report of","").replace("analyze of ","") }}</u></h3>
                </v-card-title>
                <v-card-text>
                    분석가: {{ post.username }}<br>
                    날짜: {{ new Date(parseInt(post.timestamp,10)).toLocaleString() }}&emsp;
                    <i class="material-icons">thumb_up</i> <i>{{ post.likes }}</i>
                </v-card-text>
            </v-card>
            <br>
        </div>
        <br>
        <div class="text-xs-center">
            <v-pagination v-model="page" :length="length" total-visible="10"></v-pagination>
        </div>

    </v-container>
</template>

<script>
      import {
          forEach as ForEach
      } from 'p-iteration';
    import {
        APIService
    } from '../../api/APIService'
    const apiService = new APIService()

    export default {
        name: 'recent-view',
        data: () => ({
            posts: [],
            page: 1,
            length: 0
        }),
        methods: {
            async getPosts(page) {

                const query = this.$route.query.query;

                await apiService.searchPost(page, query)
                    .then(async (response) => {

                        const pos = response.message;
                        let array = [];

                        await ForEach(pos, async (post)=>{

                            this.length = Math.ceil(response.count / 10)
                            console.log(this.length)
                            let tmp = {}
                            tmp = post;

                            tmp.username = await apiService.searchUser(post.publickey).then((user)=>{

                                if(user.message.length == 0){
                                    return post.publickey;
                                }
                                return user.message[0].username;

                            })
                            array.push(tmp);

                        });

                        this.posts = array;
                        this.posts = this.posts.sort((a, b) => b.likes - a.likes);
                    })
                    .catch(err => {

                        if (err) throw err

                    })

            },
            go(post) {
                const string = '/post/' + post.permlink
                window.location.href = string
            },
            handleThumb() {

            }
        },
        mounted() {
            this.getPosts(this.$route.params.page)
            this.page = Number(this.$route.params.page)
            this.getCount()
        },
        watch: {
            page: {
                handler(val) {
                    this.getPosts(val)
                }
            }
        }
    }
</script>

<style scoped>
    .ft-200 {
        font-weight: 200;
    }

    .post--item:hover {
        background: #f6f6f6;
    }

    .post--item a {
        text-decoration: none;
    }

    .flex-list.vertical {
        flex-direction: column;
    }

    .flex-list li {
        display: flex;
        padding: 15px 0;
        border-bottom: 1px solid #eee;
    }

    .flex-list li:last-child {
        border: none;
    }

    .flexbox-centering {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .image-scale:hover {
        transform: scale(1.05);
        transition: 0.7s;
    }


    #post:hover {
        background-color: rgba(0, 0, 0, 0.12);
    }

</style>
