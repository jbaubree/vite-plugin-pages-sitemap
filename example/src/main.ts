// eslint-disable-next-line import/named
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import routes from '~pages'

const router = createRouter({
  routes,
  history: createWebHistory(),
})

const app = createApp(App)

app.use(router)

app.mount('#app')
