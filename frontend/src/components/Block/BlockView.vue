<template>
    <v-layout>
        <v-container>
            <v-pagination class="text-center" style="padding-bottom: 20px;" circle v-model="page" :length="500"></v-pagination>
            <v-card>
                <v-card-title>
                    <h1>Block #{{ page }}</h1>
                </v-card-title>

                <v-container>
                    <v-layout>
                        <v-flex xs12>
                            <v-text-field v-model="hash" label="hash"></v-text-field>
                            <v-text-field v-model="previousBlockHash" label="previousBlockHash"></v-text-field>

                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
        </v-container>
    </v-layout>
</template>

<script>
    import {
        APIService
    } from '../../api/APIService'
    const apiService = new APIService()

    export default {
        name: 'block-view',
        data: () => ({
            page: 1,
            hash: '',
            previousBlockHash: ''
        }),
        methods: {
            getBlock(index) {
                apiService.getBlock(index)
                    .then(response => {
                        this.hash = response.message.hash
                        this.previousBlockHash = response.message.previousBlockHash
                    })
            }
        },
        mounted() {
            this.getBlock(1)
        },
        watch: {
            page: {
                handler(val) {
                    this.getBlock(val)
                }
            }
        }
    }
</script>

<style>

</style>