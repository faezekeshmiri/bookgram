<template>
  <div class="px-10 py-10">
    <v-row class="justify-start align-center">
      <div v-if="author" class="mr-15">
        <v-avatar size="110px">
          <v-img
            v-if="author.profilePicture"
            alt="Avatar"
            :src="author.profilePicture"
          ></v-img>
          <v-icon v-else color="" icon="mdi-account"></v-icon>
        </v-avatar>
      </div>
      <div class="text-h6">
        <span class="text-success">Full Name: </span>{{ author?.fullName }}
      </div>
    </v-row>

    <v-row class="justify-start pt-15 pb-10">
      <div class="text-h6">
        <span class="text-success">Books: </span>
      </div>
    </v-row>
    <v-row class="flex justify-space-between">
      <v-card class="mr-15" v-for="book in books" width="200" :key="book.id">
        <v-img
          v-if="book.coverImage"
          :src="book.coverImage"
          class="align-end"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          height="250px"
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
    const AuthorId = ref("");
    const author = computed(() => {
      return store.getAuthorById(AuthorId.value);
    });

    const fetchAuthorId = () => {
      const id = router.currentRoute.value.params.id;
      AuthorId.value = Array.isArray(id) ? id[0] : id;
    };

    onMounted(fetchAuthorId);

    const books = computed(() => {
      return store.getAuthorBooks(AuthorId.value);
    });

    return {
      author,
      books,
    };
  },
};
</script>
