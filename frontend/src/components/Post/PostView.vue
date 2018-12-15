<template>
    <v-container>
        <v-card style="overflow-y: auto;" v-if="post != {}">
            <v-card-title>
                <h2>{{ post.title }}</h2>
            </v-card-title>
            <v-card-text v-if="post.body !== undefined">
                <!-- <li>md5: {{ post.body.md5 }}</li>
                    <li>sha1: {{ post.body.sha1 }}</li>
                    <li>sha256: {{ post.body.sha256 }}</li> -->
                <!-- <li>collector: {{ post.body.collector }}</li> -->
                <div class="post-text">분석가: {{ post.username }}</div>
                <v-divider></v-divider>
                <div class="post-text">날짜: {{ new Date(parseInt(post.timestamp,10)).toLocaleString() }}</div>
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

            <v-card-actions v-if="$store.getters.isAuthenticated">
                <v-btn @click="vote" color="green" style="color: white;">Vote</v-btn>
            </v-card-actions>
        </v-card>
        <br>
        <v-card v-if="$store.getters.isAuthenticated">
            <v-card-title>
                <h2>댓글 달기</h2>
                <v-spacer></v-spacer>
                <v-btn v-if="replyContent !== ''" @click="addReply" color="green" style="color: white;">Submit</v-btn>
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
    import sign from '../../util/sign'
    const apiService = new APIService()
    import VueMarkdown from 'vue-markdown'
    import sha256 from 'sha256'
    import bs58check from 'bs58check'

    export default {
        name: 'post-view',
        data: () => ({
            post: {},
            votes: [],
            replies: [],
            replyContent: '',
            publickey: ''
        }),
        components: {
            VueMarkdown,
            markdownEditor
        },
        methods: {
            viewPost() {
                apiService.viewPost(this.$route.params.permlink)
                    .then(async (response) => {
                        this.post = response.message.post[0]
                        this.post.username = await apiService.searchUser(response.message.post[0].publickey).then(
                            (user) => {
                                console.log(user.message);
                                if (user.message.length == 0) {
                                    return response.message.post[0].publickey;
                                }
                                return user.message[0].username;

                            });

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
            },
            addReply() {
                var ws = new WebSocket("ws://106.10.43.233:59200");

                var reply = {
                    type: 'reply',
                    reply: {
                        text: this.replyContent,
                        permlink: '02' + sha256(JSON.stringify({
                            replyContent: this.replyContent,
                            permlink: this.permlink
                        })),
                        timestamp: new Date().getTime(),
                        refpermlink: this.post.permlink,
                        publickey: this.publickey
                    }
                }
                reply['reply']['sign'] = sign.signPost(reply.reply, bs58check.decode(this.$store.getters.privkey))
                reply = JSON.stringify(reply)

                ws.onopen = function open() {
                    ws.send(reply)
                }
                alert('댓글 등록이 완료되었습니다.')
                window.location.reload()
            },
            getPublicKey() {
                apiService.getProfile().then(response => {
                    this.publickey = response.profile.publickey
                })
            },
            vote() {
                var ws = new WebSocket("ws://106.10.43.233:59200");

                var vote = {
                    type: 'vote',
                    vote: {
                        voteid: '03' + sha256(JSON.stringify({
                            timestamp: new Date().getTime(),
                            refpermlink: this.post.permlink,
                            weight: 5
                        })),
                        timestamp: new Date().getTime(),
                        refpermlink: this.post.permlink,
                        publickey: this.publickey,
                        weight: 5
                    }
                }
                vote['vote']['sign'] = sign.signVote(vote.vote, bs58check.decode(this.$store.getters.privkey))
                vote = JSON.stringify(vote)

                ws.onopen = function open() {
                    ws.send(vote)
                }
                alert('Voting이 완료되었습니다')
                window.location.reload()
            }
        },
        created() {
            this.viewPost()
            if (this.$store.getters.isAuthenticated) {
                this.getPublicKey()
            }
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
        min-height: 150px;
    }

    .markdown-editor .CodeMirror {
        height: 100px;
    }
</style>