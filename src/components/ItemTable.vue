<template>
  <div>
    <button class="btn btn-primary mb-3" @click="$emit('novo')">
      Adicionar Novo
    </button>
    <table class="table table-bordered table-hover">
      <thead>
        <tr>
          <th>Nome</th>
          <th>Unidade</th>
          <th>Quantidade</th>
          <th>Preço</th>
          <th>Perecível</th>
          <th>Validade</th>
          <th>Fabricação</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, idx) in itens" :key="idx">
          <td>{{ item.nome }}</td>
          <td>{{ item.unidade }}</td>
          <td>
            {{ item.quantidade }}
            <span v-if="item.unidade === 'litro'">lt</span>
            <span v-else-if="item.unidade === 'quilograma'">kg</span>
            <span v-else-if="item.unidade === 'unidade'">un</span>
          </td>
          <td>R$ {{ item.preco }}</td>
          <td>{{ item.perecivel ? "Sim" : "Não" }}</td>
          <td>{{ item.validade ? formatDate(item.validade) : "-" }}</td>
          <td>{{ formatDate(item.fabricacao) }}</td>
          <td>
            <button
              class="btn btn-sm btn-warning me-2"
              @click="$emit('editar', idx)"
            >
              Editar
            </button>
            <button
              class="btn btn-sm btn-danger"
              @click="$emit('excluir', idx)"
            >
              Excluir
            </button>
          </td>
        </tr>
        <tr v-if="!itens.length">
          <td colspan="8" class="text-center">Nenhum item cadastrado.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  itens: {
    type: Array,
    required: true,
  },
});

function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString("pt-BR");
}
</script>
