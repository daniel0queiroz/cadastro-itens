<script setup>
import Titulo from "./components/Titulo.vue";
</script>

<template>
  <div class="container-fluid p-0">
    <div class="row m-0">
      <div class="col-12 p-0">
        <Titulo />
      </div>
    </div>

    <div class="row m-0">
      <nav
        class="col-12 col-md-2 p-4 border-end"
        style="box-sizing: border-box"
      >
        <ul class="nav flex-column text-center text-md-start mb-0">
          <li class="nav-item mb-2">
            <router-link to="/cadastro" class="nav-link">Cadastro</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/listagem" class="nav-link">Listagem</router-link>
          </li>
        </ul>
      </nav>
      <main class="col-12 col-md-10 p-4">
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.nav-link.router-link-exact-active {
  font-weight: bold;
  color: #0d6efd;
}
</style>
