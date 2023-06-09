import { defineStore } from "pinia";
import { Author } from "./models/author";
import { Book } from "./models/book";

interface State {
  authors: Author[];
  books: Book[];
}

const AUTHORS_KEY = "bookgram_authors";
const BOOKS_KEY = "books";

export const useStore = defineStore("bookgram", {
  state: (): State => {
    return {
      authors: JSON.parse(
        localStorage.getItem(AUTHORS_KEY) || "[]"
      ) as Author[],
      books: JSON.parse(localStorage.getItem(BOOKS_KEY) || "[]") as Book[],
    };
  },
  actions: {
    loadAuthors() {
      const authors = JSON.parse(
        localStorage.getItem(AUTHORS_KEY) || "[]"
      ) as Author[];
      this.authors = authors;
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
      const index = this.authors.findIndex(
        (author) => author.id === updatedAuthor.id
      );
      if (index !== -1) {
        this.authors[index] = updatedAuthor;
        localStorage.setItem(AUTHORS_KEY, JSON.stringify(this.authors));
      }
    },
    addBook(book: Book) {
      this.books.push(book);
      localStorage.setItem(BOOKS_KEY, JSON.stringify(this.books));
    },
    removeBook(index: number) {
      this.books.splice(index, 1);
      localStorage.setItem(BOOKS_KEY, JSON.stringify(this.books));
    },
    updateBook(updatedBook: Book) {
      const index = this.books.findIndex((book) => book.id === updatedBook.id);
      if (index !== -1) {
        this.books[index] = updatedBook;
        localStorage.setItem(BOOKS_KEY, JSON.stringify(this.books));
      }
    },
  },
  getters: {
    getLatestBooks(state) {
      return state.books.slice(-5);
    },
    getBookById(state) {
      return (bookId: string) => state.books.find((book) => book.id === bookId);
    },
    getAuthorById(state) {
      return (authorId: String) =>
        state.authors.find((author) => author.id === authorId);
    },
    getAuthorBooks: (state) => (authorId: string) => {
      return state.books.filter((book) => book.author?.id === authorId);
    },
  },
});
