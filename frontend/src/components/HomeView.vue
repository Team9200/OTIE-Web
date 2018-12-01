<template>
  <v-container>
    <v-card>
      <v-card-title class="headline font-weight-regular blue-grey white--text">Search Malwares</v-card-title>
      <v-card-text>
        <!-- <v-subheader class="pa-0">Where do you live?</v-subheader> -->
        <v-autocomplete v-model="model" :hint="!isEditing ? 'Click the icon to edit' : 'Click the icon to save'" :items="states"
          :readonly="!isEditing" :label="`State — ${isEditing ? 'Editable' : 'Readonly'}`" persistent-hint prepend-icon="mdi-city">
          <v-slide-x-reverse-transition slot="append-outer" mode="out-in">
            <v-icon :color="isEditing ? 'success' : 'info'" :key="`icon-${isEditing}`" @click="isEditing = !isEditing"
              v-text="isEditing ? 'mdi-check-outline' : 'mdi-circle-edit-outline'"></v-icon>
          </v-slide-x-reverse-transition>
        </v-autocomplete>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    name: 'home-view',
    data: () => ({

    })
  }
</script>

<style>

</style>