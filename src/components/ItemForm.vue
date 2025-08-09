<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <div class="mb-3">
      <label class="form-label">Nome do Item *</label>
      <input
        v-model="form.nome"
        type="text"
        class="form-control"
        :class="{ 'is-invalid': errors.nome }"
        maxlength="50"
        required
      />
      <div class="invalid-feedback">{{ errors.nome }}</div>
    </div>

    <div class="mb-3">
      <label class="form-label">Unidade de Medida *</label>
      <select
        v-model="form.unidade"
        class="form-select"
        :class="{ 'is-invalid': errors.unidade }"
        required
      >
        <option value="">Selecione</option>
        <option value="litro">Litro</option>
        <option value="quilograma">Quilograma</option>
        <option value="unidade">Unidade</option>
      </select>
      <div class="invalid-feedback">{{ errors.unidade }}</div>
    </div>

    <div class="mb-3">
      <label class="form-label">Quantidade</label>
      <div class="input-group">
        <input
          v-model="form.quantidade"
          :type="form.unidade === 'unidade' ? 'number' : 'text'"
          class="form-control"
          :class="{ 'is-invalid': errors.quantidade }"
          :step="form.unidade === 'unidade' ? 1 : '0.001'"
          :min="0"
          :pattern="form.unidade === 'unidade' ? '\\d*' : '\\d+(\\.\\d{1,3})?'"
        />
        <span class="input-group-text">
          {{ unidadeAddon }}
        </span>
        <div class="invalid-feedback">{{ errors.quantidade }}</div>
      </div>
    </div>

    <div class="mb-3">
      <label class="form-label">Preço *</label>
      <div class="input-group">
        <span class="input-group-text">R$</span>
        <input
          v-model="form.preco"
          type="text"
          class="form-control"
          :class="{ 'is-invalid': errors.preco }"
          @input="formatPreco"
          required
        />
        <div class="invalid-feedback">{{ errors.preco }}</div>
      </div>
    </div>

    <div class="form-check mb-3">
      <input
        v-model="form.perecivel"
        class="form-check-input"
        type="checkbox"
        id="perecivel"
      />
      <label class="form-check-label" for="perecivel">
        Produto Perecível *
      </label>
    </div>

    <div class="mb-3">
      <label class="form-label"
        >Data de Validade <span v-if="form.perecivel">*</span></label
      >
      <input
        v-model="form.validade"
        type="date"
        class="form-control"
        :class="{ 'is-invalid': errors.validade }"
        :required="form.perecivel"
      />
      <div class="invalid-feedback">{{ errors.validade }}</div>
      <div v-if="vencido" class="text-danger small">Produto vencido!</div>
    </div>

    <div class="mb-3">
      <label class="form-label">Data de Fabricação *</label>
      <input
        v-model="form.fabricacao"
        type="date"
        class="form-control"
        :class="{ 'is-invalid': errors.fabricacao }"
        required
      />
      <div class="invalid-feedback">{{ errors.fabricacao }}</div>
    </div>

    <div class="d-flex gap-2">
      <button type="submit" class="btn btn-success">Salvar</button>
      <button type="button" class="btn btn-secondary" @click="cancelar">
        Cancelar
      </button>
    </div>
  </form>
</template>

<script setup>
import { reactive, computed, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps({
  item: Object,
});

const emit = defineEmits(["salvar", "cancelar"]);

const router = useRouter();

const form = reactive({
  nome: props.item?.nome || "",
  unidade: props.item?.unidade || "",
  quantidade: props.item?.quantidade || "",
  preco: props.item?.preco || "",
  perecivel: props.item?.perecivel || false,
  validade: props.item?.validade || "",
  fabricacao: props.item?.fabricacao || "",
});

const errors = reactive({});

const unidadeAddon = computed(() => {
  if (form.unidade === "litro") return "lt";
  if (form.unidade === "quilograma") return "kg";
  if (form.unidade === "unidade") return "un";
  return "";
});

const vencido = computed(() => {
  if (!form.perecivel || !form.validade) return false;
  return new Date(form.validade) < new Date();
});

function formatPreco() {
  // Mascara simples para moeda (R$)
  let val = form.preco.replace(/\D/g, "");
  val = (parseInt(val, 10) / 100).toFixed(2) + "";
  form.preco = val.replace(".", ",");
}

function validar() {
  Object.keys(errors).forEach((k) => (errors[k] = ""));
  let ok = true;

  if (!form.nome) {
    errors.nome = "Campo obrigatório";
    ok = false;
  } else if (form.nome.length > 50) {
    errors.nome = "Máximo 50 caracteres";
    ok = false;
  }

  if (!form.unidade) {
    errors.unidade = "Campo obrigatório";
    ok = false;
  }

  if (form.unidade === "litro" || form.unidade === "quilograma") {
    if (form.quantidade && !/^\d+(\.\d{1,3})?$/.test(form.quantidade)) {
      errors.quantidade = "Até 3 casas decimais";
      ok = false;
    }
  }
  if (form.unidade === "unidade") {
    if (form.quantidade && !/^\d+$/.test(form.quantidade)) {
      errors.quantidade = "Somente números inteiros";
      ok = false;
    }
  }

  if (!form.preco) {
    errors.preco = "Campo obrigatório";
    ok = false;
  } else if (!/^\d+,\d{2}$/.test(form.preco)) {
    errors.preco = "Formato inválido";
    ok = false;
  }

  if (form.perecivel && !form.validade) {
    errors.validade = "Obrigatório para perecíveis";
    ok = false;
  }
  if (form.validade && new Date(form.validade) < new Date()) {
    errors.validade = "Produto vencido";
    ok = false;
  }

  if (!form.fabricacao) {
    errors.fabricacao = "Campo obrigatório";
    ok = false;
  } else if (
    form.perecivel &&
    form.validade &&
    new Date(form.fabricacao) > new Date(form.validade)
  ) {
    errors.fabricacao = "Não pode ser superior à validade";
    ok = false;
  }

  return ok;
}

function handleSubmit() {
  if (validar()) {
    emit("salvar", { ...form });
  }
}

function cancelar() {
  emit("cancelar");
}
</script>
