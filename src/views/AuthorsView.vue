<template>
  <div class="px-10 py-10">
    <v-row no-gutters class="flex flex-nowrap justify-space-between no-gutters">
      <div class="text-h4 text-success">Authors:</div>
      <v-dialog v-model="dialog" class="w-25 px-10" min-width="300px">
        <template v-slot:activator="{ props }">
          <v-btn
            prepend-icon="mdi-plus"
            color="success"
            variant="tonal"
            v-bind="props"
          >
            <span> Add New Author </span>
          </v-btn>
        </template>

        <v-card>
          <v-card-title>
            <div class="text-center">{{ dialogTitle }}</div>
          </v-card-title>
          <v-container class="px-10">
            <v-form @submit.prevent="submitForm">
              <v-text-field
                density="compact"
                v-model="author.fullName"
                label="Full Name"
                required
                prepend-icon="mdi-account"
              />
              <v-file-input
                density="compact"
                @change="onFileChange"
                label="Profile Picture"
                :rules="fileRules"
                accept="image/*"
              />
              <v-card-actions class="justify-center">
                <v-btn type="submit" color="success" variant="tonal">
                  Submit
                </v-btn>
              </v-card-actions>
            </v-form>
          </v-container>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row class="justify-center pt-15">
      <v-table fixed-header fixed-footer>
        <thead>
          <tr>
            <th class="text-left">Profile</th>
            <th class="text-left">Name</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="author in pageAuthors"
            :key="author.fullName"
            @click="showAuthorDetails(author.id)"
          >
            <td class="text-left">
              <v-avatar size="36px">
                <v-img
                  v-if="author.profilePicture"
                  alt="Avatar"
                  :src="author.profilePicture"
                ></v-img>
                <v-icon v-else color="" icon="mdi-account"></v-icon>
              </v-avatar>
            </td>
            <td class="text-left">{{ author.fullName }}</td>
            <td class="d-flex justify-space-between">
              <v-list-item class="px-0 mr-2">
                <v-btn
                  density="compact"
                  variant="tonal"
                  icon="mdi-delete"
                  color="error"
                  @click="deleteAuthor(author)"
                ></v-btn>
              </v-list-item>
              <v-list-item class="px-0 ml-2">
                <v-btn
                  variant="tonal"
                  density="compact"
                  icon="mdi-pencil"
                  color="success"
                  @click="openEditDialog(author)"
                ></v-btn>
              </v-list-item>
            </td>
          </tr>
        </tbody>
        <template v-slot:bottom>
          <div class="text-center pt-2">
            <v-pagination
              v-model="pageNumber"
              :length="pages"
              rounded="circle"
              density="compact"
            ></v-pagination>
          </div>
        </template>
      </v-table>
    </v-row>
  </div>
</template>

<script lang="ts">
import { computed, reactive, ref } from "vue";
import { useStore } from "../store/index";
import { Author } from "@/store/models/author";
import { v4 as uuidv4 } from "uuid";
import router from "@/router";

export default {
  setup() {
    const store = useStore();
    const dialog = ref(false);
    const dialogTitle = ref("Add New Author");
    const author = reactive<Author>({
      id: "",
      fullName: "",
      profilePicture: null,
    });
    const fileRules = [
      (value: any) => {
        return (
          !value ||
          !value.length ||
          value[0].size < 100000 ||
          "Image size should be less than 100 KB!"
        );
      },
    ];
    const pageLength = 5;
    const pageNumber = ref(1);

    const pages = computed(() => {
      return store.authors.length % pageLength
        ? Math.floor(store.authors.length / pageLength) + 1
        : Math.floor(store.authors.length / pageLength);
    });

    const pageAuthors = computed(() => {
      const startIndex = (pageNumber.value - 1) * pageLength;
      const endIndex = startIndex + pageLength;
      return store.authors.slice(startIndex, endIndex);
    });

    const submitForm = () => {
      if (dialogTitle.value === "Add New Author") {
        const newAuthor: Author = {
          id: uuidv4(),
          fullName: author.fullName,
          profilePicture: author.profilePicture,
        };

        store.addAuthor(newAuthor);
      } else {
        const updatedAuthor: Author = {
          id: author.id,
          fullName: author.fullName,
          profilePicture: author.profilePicture,
        };
        store.updateAuthor(updatedAuthor);
        dialogTitle.value = "Add New Author";
      }

      author.id = "";
      author.fullName = "";
      author.profilePicture = null;
      dialog.value = false;
    };

    const encodeImageFileAsURL = (file: File) => {
      var reader = new FileReader();
      reader.onloadend = function () {
        const base64Image = reader.result?.toString() || null;
        author.profilePicture = base64Image;
      };
      reader.readAsDataURL(file);
    };

    const onFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length) {
        encodeImageFileAsURL(input.files[0]);
      }
    };

    const deleteAuthor = (selectedAuthor: Author) => {
      const index = store.authors.findIndex(
        (author) => author === selectedAuthor
      );
      store.removeAuthor(index);
    };

    const openEditDialog = (selectedAuthor: Author) => {
      dialog.value = true;
      dialogTitle.value = "Edit Author";
      author.id = selectedAuthor.id;
      author.fullName = selectedAuthor.fullName;
      author.profilePicture = selectedAuthor.profilePicture;
    };

    const showAuthorDetails = (id: String) => {
      router.push(`/authors/${id}`);
    };

    return {
      store,
      dialog,
      dialogTitle,
      author,
      pageLength,
      pageNumber,
      pages,
      pageAuthors,
      fileRules,
      submitForm,
      onFileChange,
      deleteAuthor,
      openEditDialog,
      showAuthorDetails,
    };
  },
};
</script>

<style></style>
