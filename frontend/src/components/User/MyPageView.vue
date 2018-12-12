<template>
    <v-container>
        <v-card>
            <v-card-title>
                <h1>마이페이지</h1>
            </v-card-title>
            <v-card-text>
                <div class="my-text">닉네임: {{ profile.username }}</div>
                <v-divider></v-divider>
                <div class="my-text">이메일: {{ profile.email }}</div>
                <v-divider></v-divider>
                <div class="my-text">퍼블릭 키: {{ profile.publickey }}</div>
                <v-divider></v-divider>
                <div class="my-text">노드 타입: {{ profile.nodetype }}</div>
                <v-divider></v-divider>
                <div class="my-text">국적: {{ profile.country }}</div>
            </v-card-text>
        </v-card>
        <br>
        <v-card>
            <v-card-title>
                <h1>기본 정보</h1>
            </v-card-title>

            <v-card-text>

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