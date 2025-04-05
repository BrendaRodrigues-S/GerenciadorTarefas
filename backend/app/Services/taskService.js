const Task = use('App/Models/Task')

class TaskService {                                  //busca todas as tarefas do banco
  async getAllTasks() {
    return await Task.all()
  }

  async getTaskById(id) {                            //busca uma tarefa especifica pelo id
    return await Task.find(id)
  }

  async createTask(data) {                           // cria uma nova tarefa com os dados recebidos
    return await Task.create(data)
  }

  async updateTask(id, data) {
    const task = await Task.find(id)                 //busca pelo id
    if (!task) return null                           //se não existir retorna null
    task.merge(data)                                 //Usa merge(data) para atualizar os dados da tarefa
    await task.save()                                //Salva a atualização
    return task
  }

  async deleteTask(id) {                             //deleta uma tarefa pelo id
    const task = await Task.find(id)                 //busca pelo id
    if (!task) return null                           //se não existir retorna null
    await task.delete()                              //se existir ela deleta
    return task
  }
}

module.exports = new TaskService()
