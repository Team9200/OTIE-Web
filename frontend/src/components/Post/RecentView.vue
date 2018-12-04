<template>
    <v-layout>
        <v-container>
            <v-flex v-for="(malware, i) in malwares" :key="i">
                <v-card>
                    <v-card-title>
                        <ul>
                            <li>Analyzer: {{ malware.analyzer }}</li>
                            <li>Collector: {{ malware.collector }}</li>
                            <li>sha256: {{ malware.sha256 }}</li>
                        </ul>
                    </v-card-title>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                            <v-icon>favorite</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>bookmark</v-icon>
                        </v-btn>
                        <v-btn icon>
                            <v-icon>share</v-icon>
                        </v-btn>
                    </v-card-actions>
                </v-card>
                <br>
            </v-flex>
            <!-- <v-list three-line>
                <template v-for="(malware, i) in malwares">
                    <v-list-tile :key="i" avatar ripple>
                        <v-list-tile-content>
                            <v-list-tile-title>{{ malware.analyzer }}</v-list-tile-title>
                            <v-list-tile-sub-title class="text--primary">{{ malware.sha256 }}</v-list-tile-sub-title>
                            <v-list-tile-sub-title>{{ malware.tag_name_etc }}</v-list-tile-sub-title>
                        </v-list-tile-content>

                    </v-list-tile>
                    <v-divider v-if="i + 1 < malwares.length" :key="i"></v-divider>
                </template>
            </v-list> -->
            <div class="text-xs-center">
                <v-pagination v-model="page" :length="30" total-visible="7"></v-pagination>
            </div>
        </v-container>
    </v-layout>
</template>

<script>
    import {
        APIService
    } from '../../api/APIService'
    const apiService = new APIService()

    export default {
        name: 'recent-view',
        data: () => ({
            malwares: [],
            page: 1
        }),
        methods: {
            getMalwares(page) {
                apiService.getMalwares(page)
                    .then(response => {
                        this.malwares = response.message
                    })
                    .catch(err => {
                        if (err) throw err
                    })
            }
        },
        created() {
            // TODO: Add url routing & router.js
            this.getMalwares(1)
        },
        watch: {
            page: {
                handler(val) {
                    this.getMalwares(val)
                }
            }
        }
    }
</script>

<style>

</style>