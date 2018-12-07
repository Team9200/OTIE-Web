<template>
    <v-container>
        <v-card>
            <v-card-title>
                <h2>{{ malware.sha256 }}</h2>
            </v-card-title>
            <v-card-action>
                <v-container>
                    <ul>
                        <li>md5: {{ malware.md5 }}</li>
                        <li>sha1: {{ malware.sha1 }}</li>
                        <li>collector: {{ malware.collector }}</li>
                        <li>analyzer: {{ malware.analyzer }}</li>
                        <li>first_seen: {{ malware.first_seen }}</li>
                    </ul>
                </v-container>
            </v-card-action>
        </v-card>
        <br>
        <v-card>
            <v-card-title>
                <h2>Content</h2>
            </v-card-title>
            <v-card-action>
                <v-container>
                    {{ malware.description }}
                </v-container>
            </v-card-action>
        </v-card>
    </v-container>
</template>

<script>
import { APIService } from '../../api/APIService'
const apiService = new APIService()

export default {
    name: 'post-view',
    data: () => ({
        malware: {}
    }),
    methods: {
        getMalware() {
            apiService.searchMalwares("azid", this.$route.params.azid)
                .then(response => {
                    this.malware = response.message
                })
        }
    },
    created() {
        this.getMalware()
    }
}
</script>

<style>

</style>
