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
                <v-text-field v-model="sha1" label="sha1" required></v-text-field>
                <v-text-field v-model="md5" label="md5" required></v-text-field>
                <v-text-field v-model="filetype" label="filetype" required></v-text-field>

                <markdown-editor preview-class="markdown-body" v-model="content" ref="markdownEditor"></markdown-editor>
            </v-container>
            <br>
        </v-card>
    </v-container>
</template>

<script>
    import hljs from 'highlight.js'
    import {
        APIService
    } from '../../api/APIService'
    import WebSocket from 'ws';
    window.hljs = hljs;
    import markdownEditor from 'vue-simplemde/src/markdown-editor'
    import sha256 from 'sha256'

    const apiService = new APIService()

    export default {
        name: 'write-view',
        data: () => ({
            title: '',
            sha256: '',
            content: '# Hello World',
            ip: '',
            publickey: '',
            md5: '',
            sha1: '',
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
                    this.analyzer = response.publickey
                })

                const ws = new WebSocket(`ws://${this.ip}:59200`)
                ws.onopen = (event) => {
                    ws.send(JSON.stringify({
                        type: 'post',
                        pid: {
                            title: this.title,
                            timestamp: new Date().getTime(),
                            body: {
                                analyzer: this.analyzer,
                                collector: this.collector,
                                md5: this.md5,
                                sha1: this.sha1,
                                sha256: this.sha256,
                                filetype: this.filetype,
                                tag_name_etc: this.tag_name_etc,
                                filesize: this.filesize,
                                behavior: this.behavior,
                                date: new Date().getTime(),
                                first_seen: this.first_seen,
                                description: this.content
                            },
                            hashtag: [],
                            publickey: this.publickey,
                            sign: [],
                            permlink: '01' + sha256(JSON.stringify(post))
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