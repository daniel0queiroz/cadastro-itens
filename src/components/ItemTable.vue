<template>
  <div>
    <button class="btn btn-primary mb-3" @click="$emit('novo')">
      Adicionar Novo
    </button>

    <table class="table table-bordered table-hover responsive-table">
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
          <td data-label="Nome">{{ item.nome }}</td>
          <td data-label="Unidade">{{ item.unidade }}</td>
          <td data-label="Quantidade">
            {{ item.quantidade }}
            <span v-if="item.unidade === 'litro'">lt</span>
            <span v-else-if="item.unidade === 'quilograma'">kg</span>
            <span v-else-if="item.unidade === 'unidade'">un</span>
          </td>
          <td data-label="Preço">R$ {{ item.preco }}</td>
          <td data-label="Perecível">{{ item.perecivel ? "Sim" : "Não" }}</td>
          <td data-label="Validade">
            {{ item.validade ? formatDate(item.validade) : "-" }}
          </td>
          <td data-label="Fabricação">{{ formatDate(item.fabricacao) }}</td>
          <td data-label="Ações">
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

<style scoped>
/* Desktop: normal table */
.responsive-table td,
.responsive-table th {
  vertical-align: middle;
}

/* Mobile: */
@media (max-width: 768px) {
  .responsive-table thead {
    display: none; /* hide header */
  }
  .responsive-table,
  .responsive-table tbody,
  .responsive-table tr,
  .responsive-table td {
    display: block;
    width: 100%;
  }
  .responsive-table tr {
    margin-bottom: 1rem;
    border: 1px solid #dee2e6;
    padding: 0.5rem;
    border-radius: 0.375rem;
  }
  .responsive-table td {
    text-align: left;
    padding-left: 50%;
    position: relative;
    border: none;
    border-bottom: 1px solid #dee2e6;
  }
  .responsive-table td:last-child {
    border-bottom: 0;
  }
  .responsive-table td::before {
    content: attr(data-label);
    position: absolute;
    left: 1rem;
    width: 45%;
    padding-left: 0.5rem;
    font-weight: 600;
    white-space: nowrap;
  }
}
</style>
