import { Author } from "./author";

export interface Book {
  id: string;
  name: string;
  author: Author | null;
  isbn: number;
  coverImage: string | null;
  genre: string;
  pageNumber: number;
}
