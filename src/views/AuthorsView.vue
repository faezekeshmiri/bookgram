<template>
  <div>
    <v-row no-gutters class="flex-nowrap no-gutters py-10">
      <v-col cols="10">
      </v-col>
      <v-col cols="2">
        <v-dialog
          v-model="dialog"
          class="w-25 px-10"
        >
          <template v-slot:activator="{ props }">
            <v-btn prepend-icon="mdi-plus" color="success" variant="tonal" v-bind="props">
              Add New Author
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              <div class="text-center">
                Add New Author
              </div>
            </v-card-title>
            <v-container class="px-10">
              <v-form @submit.prevent="submitForm">
                <v-text-field
                  v-model="author.fullName"
                  label="Full Name"
                  required
                  prepend-icon="mdi-vuetify"
                />
                <v-file-input
                @change="onFileChange"
                  label="Profile Picture"
                  accept="image/*"
                />
                <v-card-actions class="justify-center">
                  <v-btn type="submit" color="success" variant="tonal">Submit</v-btn>
                </v-card-actions>
              </v-form>
            </v-container>
          </v-card>
          
        </v-dialog>
        
      </v-col>
    </v-row>
  </div>
  
  
  <div class="authors">This is Authors: {{ store.authors }}</div>
</template>

<script lang="ts">
import { reactive, ref } from "vue";
import { useStore } from "../store/index";
import { Author } from "@/store/models/author";

export default {
  setup() {
    const store = useStore();
    const dialog = ref(false);
    const author = reactive<Author>({
      fullName: '',
      profilePicture: null,
    });
    
    const submitForm = () => {
      store.addAuthor(author);
      author.fullName = '';
      author.profilePicture = null;
      dialog.value = false;
    }

    const encodeImageFileAsURL = (file: File) => {
      var reader = new FileReader();
      reader.onloadend = function() {
        const base64Image = reader.result?.toString() || null
        author.profilePicture = base64Image
      }
      reader.readAsDataURL(file);
    }

    const onFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length) {
        encodeImageFileAsURL(input.files[0]);
      }
    }

    return {
      store,
      dialog,
      author,
      submitForm,
      onFileChange
    };
  },
};
</script>

<style>
.v-card__title {
  font-style: italic;
}
</style>