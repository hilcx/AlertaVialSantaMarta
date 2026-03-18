import { createRouter, createWebHistory } from "vue-router"

import HomeView from "../views/HomeView.vue"
import EstadisticasView from "../views/EstadisticasView.vue"
import LoginView from "../views/LoginView.vue"

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
  },
  {
    path: "/login",
    name: "login",
    component: LoginView
  }
  
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


router.beforeEach((to, from, next) => {

  const usuario = localStorage.getItem("usuarioActivo")

  if (to.path !== "/login" && !usuario) {
    next("/login")
  } else {
    next()
  }

})

export default router





