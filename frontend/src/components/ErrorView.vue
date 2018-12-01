<template>
    <v-container>
        <v-card>
            <v-card-text class="text-md-center">
                <h1 style="font-size: 3em;">404 Not Found</h1>
                <v-btn @click="$router.push('/')" style="color: white;" color="green">Go Home</v-btn>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        name: 'error-view'
    }
</script>
