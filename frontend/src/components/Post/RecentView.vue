<template>
    <v-container v-if="posts.length > 0">
        <div v-for="(post, i) in posts" :key="i">
            <v-card style="cursor: pointer; overflow-y: auto;" id="post" @click="go(post)">
                <v-card-title>
                    <h3 ><u>{{ post.title }}</u></h3>
                </v-card-title>
                <v-card-text>
                    분석가: {{ post.username }} / 날짜: {{ new Date(parseInt(post.timestamp,10)).toLocaleString() }}
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
            getPosts(page) {
                apiService.getPosts(page)
                    .then(response => {
                        const pos = response.message;
                        let array = [];
                        pos.forEach(async function(post){
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
                    })
                    .catch(err => {
                        if (err) throw err
                    })
            },
            getCount() {
                apiService.getPostsCount()
                    .then(response => {
                        this.length = response.count
                    })
                    .catch(err => {
                        if (err) throw err
                    })
            },
            getDate(value) {
                const date = new Date(value);
                return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() +
                    ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
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
                    this.$router.push(`/recent/${val}`)
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
