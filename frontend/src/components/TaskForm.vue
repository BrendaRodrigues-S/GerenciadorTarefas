<template>
    <div>
      <v-sheet min-height="55vh" class="pa-5 rounded-xl" >
        <v-form class="form-container" ref="form" @submit.prevent="salvar">
          <v-text-field
            v-model="tarefa.title"
            label="Título"
            :rules="[v => !!v || 'O título é obrigatório']"
            required
          ></v-text-field>
  
          <v-textarea v-model="tarefa.description" label="Descrição" required></v-textarea>
  
          <v-select
            v-model="tarefa.status"
            :items="['pendente', 'em andamento', 'concluído']"
            label="Status"
            required
          ></v-select>
  
          <v-btn color="cyan darken-2" dark type="submit" class="mr-5 font-weight-black" :loading="loading" :disabled="loading">
            {{ editando ? "Atualizar" : "Salvar" }}
          </v-btn>
          <v-btn color="amber darken-4" dark class="font-weight-black" @click="limparFormulario">Cancelar</v-btn>
        </v-form>
  
        <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="3000">
          {{ snackbarMessage }}
        </v-snackbar>
      </v-sheet>
    </div>
</template>
  
<script>
import api from "@/services/api.js";

export default {
  props: ["tarefaInicial"],

  data() {
    return {
      tarefa: { title: "", description: "", status: "" },
      editando: false,
      loading: false,
      snackbar: false,
      snackbarMessage: "",
      snackbarColor: "success",
    };
  },

  watch: {
    tarefaInicial: {
      handler(novaTarefa) {
        this.tarefa = novaTarefa ? { ...novaTarefa } : { title: "", description: "", status: "" };
        this.editando = novaTarefa && novaTarefa.id != null;
      },
      immediate: true,
    },
  },

  methods: {
    async salvar() {

        if (this.loading) return;
      const valido = await this.$refs.form.validate();
      if (!valido) return;

      this.loading = true;
      try {
        let response;
        if (this.editando) {
          response = await api.put(`/tasks/${this.tarefa.id}`, this.tarefa);
          this.snackbarMessage = "Tarefa atualizada com sucesso!";
        } else {
          response = await api.post("/tasks", this.tarefa);
          this.tarefa.id = response.data.id;
          this.snackbarMessage = "Tarefa salva com sucesso!";
        }

        this.snackbarColor = "success";
        this.snackbar = true;

        this.$emit("tarefaSalva", response.data);

        this.limparFormulario();
      } catch (error) {
        console.error("Erro ao salvar tarefa:", error);
        this.snackbarMessage = "Erro ao salvar a tarefa!";
        this.snackbarColor = "error";
        this.snackbar = true;
      } finally {
        this.loading = false;
      }
    },

    limparFormulario() {
      this.tarefa = { title: "", description: "", status: "" };
      this.editando = false;
    },
  },
};
</script>

<style>
  

</style>
  

  
  