<template>
  <div>
    <v-app id="inspire">
      <v-app-bar app color="blue-grey lighten-5" flat height="80" class="align-center">
        <v-spacer></v-spacer>
        <span class="text-h5 font-weight-bold text-center blue-grey--text text--darken-1">GERENCIADOR DE TAREFAS</span>
        <v-spacer></v-spacer>
      </v-app-bar>

      <v-main class="blue-grey lighten-4">
        <v-container class="pa-10">
          <v-row justify="center">
            <v-col cols="12" sm="5" md="4">
              <TaskForm :tarefaInicial="tarefaEditando" @tarefaSalva="adicionarOuAtualizarTarefa" />
            </v-col>
            <v-col cols="12" sm="6">
              <TaskTable :tarefas="tarefas" @editar="editarTarefa" @excluir="confirmarExclusao" />
            </v-col>
          </v-row>
        </v-container>
      </v-main>

      <v-dialog v-model="dialog" max-width="400">
        <v-card>
          <v-card-title class="headline">Confirmar Exclusão</v-card-title>
          <v-card-text>Tem certeza que deseja excluir esta tarefa?</v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="gray" text @click="dialog = false">Cancelar</v-btn>
            <v-btn color="red" text @click="excluirTarefa">Excluir</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script>
import api from "@/services/api.js";
import TaskForm from "@/components/TaskForm.vue";
import TaskTable from "@/components/TaskTable.vue";

export default {
  components: { TaskForm, TaskTable },

  data() {
    return {
      tarefas: [],
      tarefaEditando: null,
      indexEditando: null,
      dialog: false,
      indexExclusao: null,
    };
  },

  mounted() {
    this.carregarTarefas();
  },

  methods: {
    async carregarTarefas() {
      try {
        const response = await api.get("/tasks");
        this.tarefas = response.data;
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    },

    adicionarOuAtualizarTarefa(tarefa) {
      if (this.indexEditando !== null) {
        this.$set(this.tarefas, this.indexEditando, tarefa);
        this.indexEditando = null;
      } else {
        this.tarefas.push(tarefa);
      }
      this.tarefaEditando = null;
    },

    editarTarefa(tarefa, index) {
      this.tarefaEditando = { ...tarefa };
      this.indexEditando = index;
    },

    confirmarExclusao(index) {
      this.indexExclusao = index;
      this.dialog = true;
    },

    async excluirTarefa() {
      if (this.indexExclusao !== null) {
        try {
          await api.delete(`/tasks/${this.tarefas[this.indexExclusao].id}`);
          this.tarefas.splice(this.indexExclusao, 1);
        } catch (error) {
          console.error("Erro ao excluir tarefa:", error);
        }
        this.dialog = false;
        this.indexExclusao = null;
      }
    },
  },
};
</script>

<style>
body, html, * {
  font-family: 'Quicksand', sans-serif !important;
}


</style>


