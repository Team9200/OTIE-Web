<template>
    <v-toolbar dense color="indigo" dark fixed app>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Open Threat Intelligence Ecosystem</v-toolbar-title>
    </v-toolbar>
</template>

<script>
export default {
    name: 'toolbar',
    data: () => ({
      drawer: null
    }),
}
</script>

