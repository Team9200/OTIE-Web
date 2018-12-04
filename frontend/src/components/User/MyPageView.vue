<template>
    <v-container>
        <h1>My Page</h1>
        {{ profile }}
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
                        this.profile = response
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

</style>