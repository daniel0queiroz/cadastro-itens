<template>
  <div>
    <h2>Listagem de Itens</h2>
    <ItemTable
      :itens="itens"
      @novo="novoItem"
      @editar="editarItem"
      @excluir="excluirItem"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import ItemTable from "../components/ItemTable.vue";

const router = useRouter();
const itens = ref([]);

onMounted(() => {
  itens.value = JSON.parse(localStorage.getItem("itens") || "[]");
});

function novoItem() {
  router.push("/cadastro");
}

function editarItem(idx) {
  router.push({ path: "/cadastro", query: { idx } });
}

function excluirItem(idx) {
  if (confirm("Deseja realmente excluir este item?")) {
    itens.value.splice(idx, 1);
    localStorage.setItem("itens", JSON.stringify(itens.value));
  }
}
</script>
