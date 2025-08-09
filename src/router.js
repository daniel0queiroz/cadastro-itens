import { createRouter, createWebHistory } from "vue-router";
import CadastroPage from "./pages/CadastroPage.vue";
import ListagemPage from "./pages/ListagemPage.vue";

const routes = [
  { path: "/", redirect: "/listagem" },
  { path: "/cadastro", component: CadastroPage },
  { path: "/listagem", component: ListagemPage },
];

export default createRouter({
  history: createWebHistory(),
  routes,
});
