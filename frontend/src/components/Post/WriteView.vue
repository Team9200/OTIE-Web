<template>
    <v-container>
        <v-layout>
            <h1>Write</h1>
            <v-spacer></v-spacer>
            <v-btn class="success">Submit</v-btn>
        </v-layout>
        <v-text-field v-model="title" label="title" required></v-text-field>
        <v-text-field v-model="sha256" label="sha256" required></v-text-field>
        <markdown-editor preview-class="markdown-body" v-model="content" ref="markdownEditor"></markdown-editor>

        <br>
    </v-container>
</template>

<script>
    import hljs from 'highlight.js';

    window.hljs = hljs;
    import markdownEditor from 'vue-simplemde/src/markdown-editor'

    export default {
        name: 'write-view',
        data: () => ({
            title: '',
            sha256: '',
            content: '# Hello World'
        }),
        components: {
            markdownEditor
        }
    }
</script>

<style>
    @import '~simplemde/dist/simplemde.min.css';
    @import '~github-markdown-css';
    @import '~highlight.js/styles/atom-one-dark.css';
</style>