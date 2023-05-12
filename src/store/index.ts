import { defineStore } from "pinia";
import { Author } from "./models/author";

interface State {
  authors: Author[];
}

const AUTHORS_KEY = "bookgram_authors";

export const useStore = defineStore("bookgram", {
  state: (): State => {
    const data = localStorage.getItem(AUTHORS_KEY);
    return {
      authors: data
        ? JSON.parse(data)
        : [{ fullName: "J.K.Roling", profilePicture: "profile" }],
    };
  },
  actions: {
    addAuthor(author: Author) {
      this.authors.push(author);
      localStorage.setItem(AUTHORS_KEY, JSON.stringify(this.authors));
    },
    removeAuthor(index: number) {
      this.authors.splice(index, 1);
      localStorage.setItem(AUTHORS_KEY, JSON.stringify(this.authors));
    },
  },
  getters: {},
});
