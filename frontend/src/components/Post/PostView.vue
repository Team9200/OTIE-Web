<template>
    <v-container>
        <v-card>
            <v-card-title>
                <h2>{{ post.title }}</h2>
            </v-card-title>
            <v-card-action>
                <v-container>
                    <ul>
                        <li>md5: {{ post.body.md5 }}</li>
                        <li>sha1: {{ post.body.sha1 }}</li>
                        <li>sha256: {{ post.body.sha256 }}</li>
                        <li>collector: {{ post.body.collector }}</li>
                        <li>analyzer: {{ post.body.analyzer }}</li>
                        <li>first_seen: {{ post.body.first_seen }}</li>
                    </ul>
                </v-container>
            </v-card-action>
        </v-card>
        <br>
        <v-card>
            <v-card-title>
                <h2>Content</h2>
            </v-card-title>
            <v-card-action>
                <v-container>
                    {{ post.body.description }}
                </v-container>
            </v-card-action>
        </v-card>
        <br>
        <v-card>
            <v-card-title>
                <h2>Reply</h2>
            </v-card-title>
            <v-card-action>
                <v-container>
                    <v-card v-for="(reply, i) in replies" :key="i">
                        <v-card-title>
                            {{ reply.text }}
                        </v-card-title>
                        <v-card-action>
                            <v-btn icon>
                                <v-icon>favorite</v-icon>
                            </v-btn>
                            140
                        </v-card-action>
                    </v-card>
                </v-container>
            </v-card-action>
        </v-card>
    </v-container>
</template>

<script>
    import {
        APIService
    } from '../../api/APIService'
    const apiService = new APIService()

    export default {
        name: 'post-view',
        data: () => ({
            post: {},
            votes: [],
            replies: []
        }),
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