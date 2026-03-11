import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"
import EstadisticasView from "../views/EstadisticasView.vue"

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView
  },
  {
    path: "/estadisticas",
    name: "estadisticas",
    component: EstadisticasView
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
