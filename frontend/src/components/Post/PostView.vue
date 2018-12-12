<template>
    <v-container>
        <v-card style="overflow-y: auto;">
            <v-card-title>
                <h2>{{ post.title }}</h2>
            </v-card-title>
            <v-card-actions>
                <v-container>
                    <ul v-if="post.body !== undefined">
                        <li>md5: {{ post.body.md5 }}</li>
                        <li>sha1: {{ post.body.sha1 }}</li>
                        <li>sha256: {{ post.body.sha256 }}</li>
                        <li>collector: {{ post.body.collector }}</li>
                        <li>analyzer: {{ post.body.analyzer }}</li>
                        <li>first_seen: {{ post.body.first_seen }}</li>
                    </ul>
                </v-container>
            </v-card-actions>
        </v-card>
        <br>
        <v-card>
            <v-card-title>
                <h2>Content</h2>
            </v-card-title>
            <v-card-actions>
                <v-container v-if="post.body !== undefined">
                    <vue-markdown>{{ post.body.description }}</vue-markdown>
                </v-container>
            </v-card-actions>
        </v-card>
        <br>
        <v-card>
            <v-card-title>
                <h2>Reply</h2>
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
            replies: []
        }),
        components: {
            VueMarkdown
        },
        methods: {
            viewPost() {
                apiService.viewPost(this.$route.params.permlink)
                    .then(response => {
                        this.post = response.message.post[0]
                        this.votes = response.message.vote
                        this.replies = response.message.reply
                    })
            }
        },
        created() {
            this.viewPost()
        }
    }
</script>

<style>

</style>