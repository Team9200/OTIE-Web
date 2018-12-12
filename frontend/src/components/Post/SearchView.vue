<template>
    <v-container>

        <v-card style="overflow-y: auto;" class="post-card">
            <!-- <v-toolbar color="transparent" flat dense card>
                <v-toolbar-title class="subheading ft-200">Recent Posts</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                    <v-icon class="text--secondary">more_vert</v-icon>
                </v-btn>
            </v-toolbar> -->
            <v-card-title>
                <h1>검색 결과 "{{ $route.query.query }}"</h1>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
                <ul class="post--list flex-list vertical">
                    <li class="post--item" v-for="(post, i) in posts" :key="i">
                        <a @click="go(post)" class="post--link pa-4 layout row ma-0 text--primary">
                            <div class="post--content ml-3">
                                <h3 class="title post--title">
                                    {{ post.title }}
                                </h3>
                                <div class="post--desc py-2 text--secondary">
                                    {{ post.description }}
                                </div>
                                <div class="post--meta o-flex justify-space-between">
                                    <div class="post--author caption grey--text text--darken-1">
                                        <span>{{post.body.analyzer}}</span>
                                        <time class="px-2">{{getDate(post.timestamp)}}</time>
                                    </div>
                                    <div class="social">
                                        <a @click="handleThumb" class="grey--text text--darken-1">
                                            <v-icon small>thumb_up</v-icon>
                                            <small>100+</small>
                                        </a>
                                        <!-- <a @click="handleComment" class="grey--text text--darken-1 mx-3">
                                            <v-icon small>mode_comment</v-icon>
                                            <small>12+</small>
                                        </a>
                                        <a @click="handleFavorite" class="grey--text text--darken-1">
                                            <v-icon small>favorite</v-icon>
                                            <small>50+</small>
                                        </a> -->
                                    </div>
                                </div>
                            </div>
                        </a>
                    </li>
                </ul>
            </v-card-text>
        </v-card>
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
        name: 'search-view',
        data: () => ({
            posts: [],
            page: 1,
            length: 0
        }),
        methods: {
            getPosts(page) {
            	const query = this.$route.query.query;

                apiService.searchPost(page,query)
                    .then(response => {
                        this.posts = response.message
                        this.length = Math.ceil(response.count / 10)
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
            // TODO: Add url routing & router.js
            this.getPosts(1)
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
</style>