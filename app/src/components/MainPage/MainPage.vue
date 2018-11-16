<template>  
    <v-app id="inspire">
        <navigation></navigation>
        <toolbar></toolbar>
        <v-content>
            <v-container fluid fill-height>
                
            </v-container>
        </v-content>
        <footer></footer>
    </v-app>
</template>


<script>
import Navigation from '../common/Navigation';
import Toolbar from '../common/Toolbar';
import Footer from '../common/Footer';

export default {
    name: 'main-page',
    components: {
        Navigation,
        Toolbar,
        Footer
    }
}
</script>
