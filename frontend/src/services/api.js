import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3333",
});

export default api;

// export default {
//   getTasks() {
//     return api.get("/tasks"); // Busca todas as tarefas
//   },
//   createTask(task) {
//     return api.post("/tasks", task); // Cria uma nova tarefa
//   },
//   updateTask(task) {
//     return api.put(`/tasks/${task.id}`, task); // Atualiza uma tarefa existente
//   },
//   deleteTask(taskId) {
//     return api.delete(`/tasks/${taskId}`); // Deleta uma tarefa
//   },
// };

