<template>
    <v-container>
        <v-card>
            <v-container>
                <v-layout>
                    <h1>Write</h1>
                    <v-spacer></v-spacer>
                    <v-btn @click="submit" class="success">Submit</v-btn>
                </v-layout>
                <v-text-field v-model="title" label="title" required></v-text-field>
                <v-text-field v-model="sha256" label="sha256" required></v-text-field>
                <markdown-editor preview-class="markdown-body" v-model="content" ref="markdownEditor"></markdown-editor>
            </v-container>
            <br>
        </v-card>
    </v-container>
</template>

<script>
    import hljs from 'highlight.js'
    import { APIService } from '../../api/APIService'
    import WebSocket from 'ws';
    window.hljs = hljs;
    import markdownEditor from 'vue-simplemde/src/markdown-editor'
    
    const apiService = new APIService()

    export default {
        name: 'write-view',
        data: () => ({
            title: '',
            sha256: '',
            content: '# Hello World',
            ip: '',
            publickey: ''
        }),
        components: {
            markdownEditor
        },
        methods: {
            getTracker(ip) {
              apiService.getTracker(ip)
                .then(response => {
                    this.ip = response.address
                })
            },
            submit() {
                apiService.getProfile().then(response => {
                    this.publickey = response.publickey
                })

                const ws = new WebSocket(`ws://${this.ip}:59200`)
                ws.onopen = (event) => {
                    ws.send(JSON.stringify({
                        type: 'post',
                        pid: {
                            title: this.title,
                            timestamp: new Date().getTime(),
                            body: {},
                            hashtag: [],
                            publickey: this.publickey,
                            sign: [],
                            permlink: this.permlink
                        }
                    }))
                }
            }
        }
    }
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
    @import '~github-markdown-css';
    @import '~highlight.js/styles/atom-one-dark.css';
</style>