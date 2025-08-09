<script setup>
import Titulo from "./components/Titulo.vue";
</script>

<template>
  <Titulo />
  <div class="row">
    <nav class="col-md-2 p-4 border-end min-vh-100">
      <ul class="nav flex-column">
        <li class="nav-item mb-2">
          <router-link to="/cadastro" class="nav-link">Cadastro</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/listagem" class="nav-link">Listagem</router-link>
        </li>
      </ul>
    </nav>
    <main class="col-md-10 p-4">
      <router-view />
    </main>
  </div>
</template>

<style scoped>
.nav-link.router-link-exact-active {
  font-weight: bold;
  color: #0d6efd;
}
</style>
