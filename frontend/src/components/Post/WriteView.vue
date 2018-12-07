<template>
    <v-container>
        <v-layout>
            <h1>Write</h1>
            <v-spacer></v-spacer>
            <v-btn class="success">Submit</v-btn>
        </v-layout>
        <v-text-field v-model="title" label="title" required></v-text-field>
        <v-text-field v-model="sha256" label="sha256" required></v-text-field>
        <quill-editor v-model="content"></quill-editor>
        <br>
    </v-container>
</template>

<script>
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import {
        quillEditor
    } from 'vue-quill-editor'

    export default {
        name: 'write-view',
        data: () => ({
            title: '',
            sha256: '',
            content: '<h1>Hello World</h1>'
        }),
        components: {
            quillEditor
        }
    }
</script>

<style>

</style>