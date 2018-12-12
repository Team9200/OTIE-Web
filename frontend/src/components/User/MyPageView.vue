<template>
    <v-container>
        <v-card>
            <v-card-title>
                <h1>마이페이지</h1>
            </v-card-title>
            <v-card-text>
                <div class="my-text">username: {{ profile.username }}</div>
                <v-divider></v-divider>
                <div class="my-text">email: {{ profile.email }}</div>
                <v-divider></v-divider>
                <div class="my-text">publickey: {{ profile.publickey }}</div>
                <v-divider></v-divider>
                <div class="my-text">nodetype: {{ profile.nodetype }}</div>
                <v-divider></v-divider>
                <div class="my-text">country: {{ profile.country }}</div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    import {
        APIService
    } from '../../api/APIService'
    const apiService = new APIService();

    export default {
        name: 'my-page-view',
        data: () => ({
            profile: {}
        }),
        methods: {
            getProfile() {
                apiService.getProfile()
                    .then(response => {
                        this.profile = response.profile
                    })
                    .catch(err => {
                        if (err) throw err
                    })
            }
        },
        created() {
            this.getProfile()
        }
    }
</script>

<style>
    .my-text {
        font-size: 15px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
</style>