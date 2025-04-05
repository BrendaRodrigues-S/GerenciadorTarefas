<template>
  <div>
    <v-sheet min-height="55vh" class="pa-5 rounded-xl">
      <v-simple-table>
        <thead>
          <tr>
            <th class="body-1 font-weight-bold">Título</th>
            <th class="body-1 font-weight-bold">Descrição</th>
            <th class="body-1 font-weight-bold">Status</th>
            <th class="body-1 font-weight-bold">Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(t, index) in tarefas" :key="t.id">
            <td>{{ t.title }}</td>
            <td>{{ t.description }}</td>
            <td>{{ t.status }}</td>
            <td>
              <v-btn icon color="blue" @click="$emit('editar', t, index)">
                ✏️
              </v-btn>
              <v-btn icon color="red" @click="$emit('excluir', index)">
                🗑️
              </v-btn>
            </td>
          </tr>
        </tbody>
      </v-simple-table>
    </v-sheet>
  </div>
</template>

<script>
export default {
  props: ["tarefas"],
};
</script>

