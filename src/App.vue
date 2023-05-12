<template>
  <!-- <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/authors">About</router-link>
  </nav>
  <div class="bg-surface-variant">
    <v-row no-gutters class="flex-nowrap no-gutters">
      <v-col cols="1" class="flex-grow-0 flex-shrink-0">
      </v-col>
      <v-col cols="1" style="min-width: 100px; max-width: 100%;" class="flex-grow-1 flex-shrink-0">
        <router-view/>
      </v-col>
    </v-row>
  </div> -->
  <v-app>
    <v-tabs class="" align-tabs="center">
      <v-tab to="/">Books</v-tab>
      <v-tab to="/authors">Authors</v-tab>
    </v-tabs>
    <router-view></router-view>
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
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
