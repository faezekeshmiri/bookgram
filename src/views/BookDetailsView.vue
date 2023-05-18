<template>
  <div class="px-10 py-10">
    <v-row class="flex justify-start">
      <v-card width="300px" class="mr-15">
        <v-img
          v-if="book?.coverImage"
          :src="book?.coverImage"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="300px"
          cover
        >
          <v-card-title
            class="text-white text-h5"
            v-text="book.name"
          ></v-card-title>
        </v-img>
        <v-img
          v-else
          :src="require('@/assets/images.jpeg')"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="250px"
          cover
        >
          <v-card-title class="text-white" v-text="book?.name"></v-card-title>
        </v-img>
      </v-card>
      <div class="align-self-center">
        <div class="text-h6 py-3">
          <span class="text-success">Author: </span>{{ book?.author?.fullName }}
        </div>
        <div class="text-h6 py-3">
          <span class="text-success">ISBN Number: </span>{{ book?.isbn }}
        </div>
        <div class="text-h6 py-3">
          <span class="text-success">Genre: </span>{{ book?.genre }}
        </div>
        <div class="text-h6 py-3">
          <span class="text-success">Page Number: </span>{{ book?.pageNumber }}
        </div>
      </div>
    </v-row>
    <v-row> </v-row>
  </div>
</template>

<script lang="ts">
import router from "@/router";
import { ref, computed, onMounted } from "vue";
import { useStore } from "../store/index";

export default {
  setup() {
    const store = useStore();
    const bookId = ref("");

    const book = computed(() => {
      return store.getBookById(bookId.value);
    });

    const fetchBookId = () => {
      const id = router.currentRoute.value.params.id;
      bookId.value = Array.isArray(id) ? id[0] : id;
    };

    onMounted(fetchBookId);

    return {
      book,
    };
  },
};
</script>
