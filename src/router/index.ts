import { createRouter, createWebHistory } from 'vue-router'
import BooksView from '../views/BooksView.vue'
import AuthorsView from '../views/AuthorsView.vue'
import BookDetailsView from '../views/BookDetailsView.vue'
import AuthorDetailsView from '../views/AuthorDetailsView.vue'


const routes = [
  {
    path: '/',
    name: 'Books',
    component: BooksView
  },
  {
    path: '/authors',
    name: 'Authors',
    component: AuthorsView
  },
  {
    path:'/books/:id',
    name: 'BookDetails',
    component: BookDetailsView
  },
  {
    path:'/authors/:id',
    name: 'AuthorDetails',
    component: AuthorDetailsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
