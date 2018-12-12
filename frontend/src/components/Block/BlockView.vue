<template>
    <v-layout>
        <v-container>
            <v-layout justify-center>
                <v-pagination total-visible="10" style="padding-bottom: 20px;" v-model="page" :length="length"></v-pagination>
            </v-layout>
            <v-card>
                <v-card-title>
                    <h1>{{ page }}번 블록</h1>
                </v-card-title>

                <v-container>
                    <v-layout>
                        <v-flex xs12>
                            <v-text-field v-model="hash" label="hash"></v-text-field>
                            <v-text-field v-model="previousBlockHash" label="previousBlockHash"></v-text-field>
                            <v-text-field v-model="timestamp" label="timestamp"></v-text-field>
                        </v-flex>
                    </v-layout>
                </v-container>
            </v-card>
            <div style="padding-top: 10px;"></div>
            <v-card v-if="postList[0] !== undefined" class="scroll">
                <v-card-title>
                    <h1>보고서</h1>
                </v-card-title>

                <v-container>
                    <div v-for="(post, i) in postList" :key="i">
                        <!-- <h3>{{ post.permlink }}</h3> -->
                        <v-tooltip bottom>
                            <span @click="go(post)" slot="activator">{{ post.permlink }}</span>
                            <span>제목: {{ post.title }}<br>시간: {{ getDate(post.timestamp) }}</span>
                        </v-tooltip>
                    </div>
                </v-container>
            </v-card>

            <div style="padding-top: 10px;"></div>
            <v-card v-if="replyList[0] !== undefined" class="scroll">
                <v-card-title>
                    <h1>댓글</h1>
                </v-card-title>

                <v-container>
                    <div v-for="(reply, i) in replyList" :key="i">
                        <v-tooltip bottom>
                            <span slot="activator">{{ reply.permlink }}</span>
                            <span>댓글: {{ reply.text }}</span>
                        </v-tooltip>
                    </div>
                </v-container>
            </v-card>


            <div style="padding-top: 10px;"></div>
            <v-card v-if="voteList[0] !== undefined" class="scroll">
                <v-card-title>
                    <h1>좋아요</h1>
                </v-card-title>

                <v-container>
                    <div v-for="(vote, i) in voteList" :key="i">
                        <v-tooltip bottom>
                            <span slot="activator">{{ vote.voteid }}</span>
                            <span>닉네임: {{ vote.publickey }}</span>
                        </v-tooltip>
                    </div>
                </v-container>
            </v-card>


            <div style="padding-top: 10px;"></div>
            <v-card v-if="transactionList[0] !== undefined">
                <v-card-title>
                    <h1>거래</h1>
                </v-card-title>

                <v-container class="scroll">
                    <div v-for="(transaction, i) in transactionList" :key="i">
                        <v-tooltip bottom>
                            <span slot="activator">{{ transaction.txid }}</span>
                            <span>거래: {{ transaction.txid }}</span>
                        </v-tooltip>
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
            length: 0,
            hash: '',
            previousBlockHash: '',
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
                        this.previousBlockHash = response.message.previousBlockHash
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
            getCount() {
                apiService.getBlockCount()
                    .then(response => {
                        this.length = response.count
                    })
                    .catch(err => {
                        if (err) throw err
                    })
            },
            go(post) {
                const string = '/post/' + post.permlink
                window.location.href = string
            }
        },
        mounted() {
            this.getBlock(1)
            this.getCount()
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