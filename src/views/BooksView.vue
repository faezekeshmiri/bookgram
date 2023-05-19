<template>
  <div class="px-10 py-10">
    <v-row no-gutters class="flex flex-nowrap justify-space-between no-gutters">
      <div class="text-h4 text-success">Books:</div>
      <v-dialog v-model="dialog" class="w-25 px-10" min-width="300px">
        <template v-slot:activator="{ props }">
          <v-btn
            prepend-icon="mdi-plus"
            color="success"
            variant="tonal"
            v-bind="props"
          >
            <span> Add New Book </span>
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
                v-model="book.name"
                label="Name"
                required
                prepend-icon="mdi-book-open-page-variant"
              />

              <v-select
                density="compact"
                v-model="book.author"
                :items="store.authors"
                :rules="[(v) => !!v || 'Author is required']"
                label="Author"
                item-title="fullName"
                return-object
                prepend-icon="mdi-account"
                required
              ></v-select>

              <v-select
                density="compact"
                v-model="book.genre"
                :items="genres"
                :rules="[(v) => !!v || 'Genre is required']"
                label="Genre"
                prepend-icon="mdi-book-multiple"
                required
              ></v-select>

              <v-file-input
                density="compact"
                @change="onFileChange"
                label="Cover Image"
                :rules="fileRules"
                accept="image/*"
              />
              <v-row>
                <v-col>
                  <v-text-field
                    type="number"
                    density="compact"
                    v-model="book.isbn"
                    label="ISBN"
                    required
                  />
                </v-col>
                <v-col>
                  <v-text-field
                    type="number"
                    density="compact"
                    v-model="book.pageNumber"
                    label="Page Number"
                    required
                  />
                </v-col>
              </v-row>
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
            <th class="text-left">Cover</th>
            <th class="text-left">Name</th>
            <th class="text-left">Author</th>
            <th class="text-left">ISBN</th>
            <th class="text-left">Genre</th>
            <th class="text-left">Page Number</th>
            <th class="text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="book in pageBooks" :key="book.isbn">
            <td class="text-left" @click="showBookDetails(book.id)">
              <v-avatar size="36px">
                <v-img
                  v-if="book.coverImage"
                  alt="Avatar"
                  :src="book.coverImage"
                ></v-img>
                <v-icon v-else color="" icon="mdi-book"></v-icon>
              </v-avatar>
            </td>
            <td class="text-left">{{ book.name }}</td>
            <td class="text-left">{{ book.author?.fullName }}</td>
            <td class="text-left">{{ book.isbn }}</td>
            <td class="text-left">{{ book.genre }}</td>
            <td class="text-left">{{ book.pageNumber }}</td>
            <td class="d-flex justify-space-between">
              <v-list-item class="px-0 mr-2">
                <v-btn
                  density="compact"
                  variant="tonal"
                  icon="mdi-delete"
                  color="error"
                  @click="deleteBook(book)"
                ></v-btn>
              </v-list-item>
              <v-list-item class="px-0 ml-2">
                <v-btn
                  variant="tonal"
                  density="compact"
                  icon="mdi-pencil"
                  color="success"
                  @click="openEditDialog(book)"
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
import { Book } from "@/store/models/book";
import { v4 as uuidv4 } from "uuid";
import router from "@/router";

export default {
  setup() {
    const store = useStore();
    const dialog = ref(false);
    const dialogTitle = ref("Add New Book");
    const book = reactive<Book>({
      id: "",
      name: "",
      author: null,
      isbn: 0,
      coverImage: null,
      genre: "",
      pageNumber: 0,
    });
    const fileRules = [
        (value: any) => {
          return !value || !value.length || value[0].size < 100000 || 'Image size should be less than 100 KB!'
        },
      ];
    const pageLength = 5;
    const pageNumber = ref(1);
    const genres = [
      "Fiction",
      "Nonfiction",
      "Mystery",
      "Fantasy",
      "Horror",
      "Romance",
      "Poetry",
      "History",
    ];

    const pages = computed(() => {
      return store.books.length % pageLength
        ? Math.floor(store.books.length / pageLength) + 1
        : Math.floor(store.books.length / pageLength);
    });

    const pageBooks = computed(() => {
      const startIndex = (pageNumber.value - 1) * pageLength;
      const endIndex = startIndex + pageLength;
      return store.books.slice(startIndex, endIndex);
    });

    const submitForm = () => {
      if (dialogTitle.value === "Add New Book") {
        const newBook: Book = {
          id: uuidv4(),
          name: book.name,
          author: book.author,
          isbn: book.isbn,
          coverImage: book.coverImage,
          genre: book.genre,
          pageNumber: book.pageNumber,
        };

        store.addBook(newBook);
      } else {
        const updatedBook: Book = {
          id: book.id,
          name: book.name,
          author: book.author,
          isbn: book.isbn,
          coverImage: book.coverImage,
          genre: book.genre,
          pageNumber: book.pageNumber,
        };
        store.updateBook(updatedBook);
        dialogTitle.value = "Add New Book";
      }

      book.id = "";
      book.name = "";
      book.author = null;
      book.isbn = 0;
      book.coverImage = null;
      book.genre = "";
      book.pageNumber = 0;
      dialog.value = false;
    };

    const encodeImageFileAsURL = (file: File) => {
      var reader = new FileReader();
      reader.onloadend = function () {
        const base64Image = reader.result?.toString() || null;
        book.coverImage = base64Image;
      };
      reader.readAsDataURL(file);
    };

    const onFileChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      if (input.files && input.files.length) {
        
        encodeImageFileAsURL(input.files[0]);
      }
    };

    const deleteBook = (selectedBook: Book) => {
      const index = store.books.findIndex((book) => book === selectedBook);
      store.removeBook(index);
    };

    const openEditDialog = (selectedBook: Book) => {
      dialog.value = true;
      dialogTitle.value = "Edit Book";
      book.id = selectedBook.id;
      book.name = selectedBook.name;
      book.author = selectedBook.author;
      book.isbn = selectedBook.isbn;
      book.coverImage = selectedBook.coverImage;
      book.genre = selectedBook.genre;
      book.pageNumber = selectedBook.pageNumber;
    };

    const showBookDetails = (id: string) => {
      router.push(`/books/${id}`)
    }

    

    return {
      store,
      dialog,
      dialogTitle,
      book,
      genres,
      pageLength,
      pageNumber,
      pages,
      pageBooks,
      fileRules,
      submitForm,
      onFileChange,
      deleteBook,
      openEditDialog,
      showBookDetails,
      
    };
  },
};
</script>

<style></style>
