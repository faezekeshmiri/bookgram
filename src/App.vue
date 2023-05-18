<template>
  <v-app>
    <v-tabs class="" align-tabs="center">
      <v-tab to="/">Books</v-tab>
      <v-tab to="/authors">Authors</v-tab>
    </v-tabs>
    <v-row class="h-75">
      <v-col>
        
      </v-col>
      <v-col>
        <router-view></router-view>
      </v-col>
    </v-row>
    
    <v-footer class="bg-green-lighten-4" style="padding: 0px !important;" >
      <div class="px-4 py-2 text-success text-center w-100">
        &copy; 2023 Bookgram
      </div>
    </v-footer>
  </v-app>
</template>

<script>

  export default {
    components: {
    },
    data () {
      return {
      }
    },
  }
</script>
<style>
</style>
