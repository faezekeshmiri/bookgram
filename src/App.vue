<template>
  <v-app>
    
    <v-row class="h-100">
      <v-col class="d-flex bg-green-lighten-5 py-15 justify-center align-center" cols="2">
        <div class="text-success">
          <div class="py-2" v-for="book in store.getLatestBooks" :key="book.id">
            {{book.name}}
          </div>
        </div>
      </v-col>
      <v-col cols="10" class="px-0 py-0">
        <div class="bg-green-lighten-5 py-5">
          <v-tabs align-tabs="center text-success">
            <v-tab to="/">Books</v-tab>
            <v-tab to="/authors">Authors</v-tab>
          </v-tabs>
        </div>
        <div>
          <router-view></router-view>
        </div>
      </v-col>
    </v-row>
    <v-footer class="bg-green-lighten-5" style="padding: 0px !important;" >
      <div class="px-4 py-6 text-success text-center w-100">
        &copy; 2023 Bookgram
      </div>
    </v-footer>
  </v-app>
</template>

<script lang="ts">
import { useStore } from "./store/index";
export default{
  setup(){
    const store = useStore();

    return{
      store
    }
  }
}
</script>
<style>
</style>
