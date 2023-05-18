import { defineStore } from "pinia";
import { Author } from "./models/author";

interface State {
  authors: Author[];
}

const AUTHORS_KEY = "bookgram_authors";

export const useStore = defineStore("bookgram", {
  state: (): State => {
    return {
      authors: JSON.parse(localStorage.getItem(AUTHORS_KEY) || '[]') as Author[]
    };
  },
  actions: {
    loadAuthors() {
      const authors = JSON.parse(localStorage.getItem(AUTHORS_KEY) || '[]') as Author[]
      this.authors = authors
    },
    addAuthor(author: Author) {
      this.authors.push(author);
      localStorage.setItem(AUTHORS_KEY, JSON.stringify(this.authors));
    },
    removeAuthor(index: number) {
      this.authors.splice(index, 1);
      localStorage.setItem(AUTHORS_KEY, JSON.stringify(this.authors));
    },
    updateAuthor(updatedAuthor: Author) {
      const index = this.authors.findIndex((author) => author.id === updatedAuthor.id);
      if (index !== -1) {
        this.authors[index] = updatedAuthor;
        localStorage.setItem(AUTHORS_KEY, JSON.stringify(this.authors));
      }
    },
  },
});
