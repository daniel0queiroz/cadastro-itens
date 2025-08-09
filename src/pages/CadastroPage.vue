<template>
  <div>
    <h2>Cadastro de Item</h2>
    <ItemForm :item="itemEdit" @salvar="salvarItem" @cancelar="voltar" />
  </div>
</template>

<script setup>
import ItemForm from "../components/ItemForm.vue";
import { useRouter, useRoute } from "vue-router";
import { ref, computed } from "vue";

const router = useRouter();
const route = useRoute();

const itens = JSON.parse(localStorage.getItem("itens") || "[]");
const idx = route.query.idx;
const itemEdit = ref(idx !== undefined ? itens[idx] : null);

function salvarItem(item) {
  if (idx !== undefined) {
    // Editando
    itens[idx] = item;
  } else {
    // Novo
    itens.push(item);
  }
  localStorage.setItem("itens", JSON.stringify(itens));
  router.push("/listagem");
}

function voltar() {
  router.push("/listagem");
}
</script>
