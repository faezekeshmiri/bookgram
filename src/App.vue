<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/authors">About</router-link>
  </nav>
  <div class="bg-surface-variant">
    <v-row no-gutters class="flex-nowrap no-gutters">
      <v-col cols="1" class="flex-grow-0 flex-shrink-0">
        <v-app class="bg-surface-variant">
          <side-bar></side-bar>
        </v-app>
      </v-col>
      <v-col cols="1" style="min-width: 100px; max-width: 100%;" class="flex-grow-1 flex-shrink-0">
        <router-view/>
      </v-col>
    </v-row>
  </div>
  <v-footer class="bg-grey-lighten-1"></v-footer>
</template>

<script>
  import SideBar from './components/SideBar.vue';

  export default {
    components: {
      SideBar
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
