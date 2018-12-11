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
                            <v-text-field v-model="timestamp" label="timestamp"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
            <div style="padding-top: 10px;"></div>
            <v-card v-if="postList[0] !== undefined" class="scroll">
                <v-card-title>
                    <h1>Post</h1>
                </v-card-title>

                <v-container>
                    <div v-for="(post, i) in postList" :key="i">
                        <h3>{{ post.permlink }}</h3>
                    </div>
                </v-container>
            </v-card>

            <div style="padding-top: 10px;"></div>
            <v-card v-if="replyList[0] !== undefined" class="scroll">
                <v-card-title>
                    <h1>Reply</h1>
                </v-card-title>

                <v-container>
                    <div v-for="(reply, i) in replyList" :key="i">
                        <h3>{{ reply.permlink }}</h3>
                    </div>
                </v-container>
            </v-card>


            <div style="padding-top: 10px;"></div>
            <v-card v-if="voteList[0] !== undefined" class="scroll">
                <v-card-title>
                    <h1>Vote</h1>
                </v-card-title>

                <v-container>
                    <div v-for="(vote, i) in voteList" :key="i">
                        <h3>{{ vote.voteid }}</h3>
                    </div>
                </v-container>
            </v-card>


            <div style="padding-top: 10px;"></div>
            <v-card v-if="transactionList[0] !== undefined">
                <v-card-title>
                    <h1>Transaction</h1>
                </v-card-title>

                <v-container class="scroll">
                    <div v-for="(transaction, i) in transactionList" :key="i">
                        <h3>{{ transaction.txid }}</h3>
                    </div>
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
            timestamp: '',
            postList: [],
            voteList: [],
            replyList: [],
            transactionList: []
        }),
        methods: {
            getBlock(index) {
                apiService.getBlock(index)
                    .then(response => {
                        this.hash = response.message.hash
                        this.timestamp = this.getDate(response.message.timestamp)
                        this.postList = response.message.postList
                        this.voteList = response.message.voteList
                        this.replyList = response.message.replyList
                        this.transactionList = response.message.transactionList
                    })
            },
            getDate(value) {
                const date = new Date(value);
                return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() +
                    ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            },
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
    .scroll {
        overflow-y: auto;
    }
</style>