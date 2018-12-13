<template>
    <v-container>
        <v-card style="overflow-y: auto;">
            <v-card-title>
                <h2>{{ post.title }}</h2>
            </v-card-title>
            <v-card-text v-if="post.body !== undefined">
                <!-- <li>md5: {{ post.body.md5 }}</li>
                    <li>sha1: {{ post.body.sha1 }}</li>
                    <li>sha256: {{ post.body.sha256 }}</li> -->
                <!-- <li>collector: {{ post.body.collector }}</li> -->
                <div class="post-text">분석가: {{ post.body.analyzer }}</div>
                <v-divider></v-divider>
                <div class="post-text">날짜: {{ getDate(post.timestamp) }}</div>
                <v-divider></v-divider>
                <v-btn @click="go(post)" style="color: white;" color="green">Malware Info ({{ post.body.sha256 }})</v-btn>
                <!-- <li>first_seen: {{ post.body.first_seen }}</li> -->
            </v-card-text>
        </v-card>
        <br>
        <v-card>
            <!-- <v-card-title>
                <h2>Content</h2>
            </v-card-title> -->
            <v-card-text v-if="post.body !== undefined">
                <!-- <v-container v-if="post.body !== undefined"> -->
                <vue-markdown>{{ post.body.description }}</vue-markdown>
                <!-- </v-container> -->
            </v-card-text>
        </v-card>
        <br>
        <v-card>
            <v-card-title>
                <h2>댓글 달기</h2>
            </v-card-title>
            <v-card-text>
                <markdown-editor preview-class="markdown-body" v-model="replyContent" ref="markdownEditor"></markdown-editor>
            </v-card-text>
        </v-card>
        <br>
        <v-card>
            <v-card-title>
                <h2>댓글</h2>
            </v-card-title>
            <v-card-actions>
                <v-container>
                    <v-card v-for="(reply, i) in replies" :key="i">
                        <v-card-title>
                            {{ reply.text }}
                        </v-card-title>
                        <v-card-actions>
                            <v-btn icon>
                                <v-icon>favorite</v-icon>
                            </v-btn>
                            140
                        </v-card-actions>
                    </v-card>
                </v-container>
            </v-card-actions>
        </v-card>
    </v-container>
</template>

<script>
    import hljs from 'highlight.js'

    window.hljs = hljs;
    import markdownEditor from 'vue-simplemde/src/markdown-editor'


    import {
        APIService
    } from '../../api/APIService'
    const apiService = new APIService()
    import VueMarkdown from 'vue-markdown'

    export default {
        name: 'post-view',
        data: () => ({
            post: {},
            votes: [],
            replies: [],
            replyContent: ''
        }),
        components: {
            VueMarkdown,
            markdownEditor
        },
        methods: {
            viewPost() {
                apiService.viewPost(this.$route.params.permlink)
                    .then(response => {
                        this.post = response.message.post[0]
                        this.votes = response.message.vote
                        this.replies = response.message.reply
                    })
            },
            getDate(value) {
                const date = new Date(value);
                return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() +
                    ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            },
            go(post) {
                const string = '/malware/' + post.body.sha256
                window.location.href = string
            }
        },
        created() {
            this.viewPost()
        }
    }
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
    @import '~github-markdown-css';
    @import '~highlight.js/styles/atom-one-dark.css';

    .post-text {
        font-size: 15px;
        padding-top: 5px;
        padding-bottom: 5px;
    }

    .markdown-editor .CodeMirror,
    .markdown-editor .CodeMirror-scroll {
        min-height: 100px;
    }

    .markdown-editor .CodeMirror {
        height: 100px;
    }
</style>