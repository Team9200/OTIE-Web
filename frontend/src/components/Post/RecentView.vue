<template>
    <v-container>
        <div v-for="(post, i) in posts" :key="i">
            <v-card style="overflow-y: auto;" id="post">
                <v-card-title>
                    <h3 @click="go(post)"><u>{{ post.title }}</u></h3>
                </v-card-title>
                <v-card-text>
                    분석가: {{ post.body.analyzer }} / 날짜: {{ getDate(post.timestamp) }}
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
                        this.posts = response.message
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
