import { createRouter, createWebHistory } from 'vue-router'
import BooksView from '../views/BooksView.vue'
import AuthorsView from '../views/AuthorsView.vue'

const routes = [
  {
    path: '/',
    name: 'books',
    component: BooksView
  },
  {
    path: '/authors',
    name: 'authors',
    component: AuthorsView
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
