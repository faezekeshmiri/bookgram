<template>
  <div class="authors">This is Authors: {{ store.authors }}</div>
</template>

<script lang="ts">
// import { ref } from "vue";
import { useStore } from "../store/index";

export default {
  setup() {
    const store = useStore();
    return {
      store,
    };
  },
};
</script>
