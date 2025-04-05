'use strict'

const TaskService = use('App/Services/TaskService')        //interagir com tarefas

class TaskController {
  async index({ response }) {                             //Retorna todas as tarefas em formato JSON
    const tasks = await TaskService.getAllTasks()
    return response.json(tasks)
  }

  async show({ params, response }) {                      // Procura a tarefa pelo id (usando params.id)
    const task = await TaskService.getTaskById(params.id)
    if (!task) return response.status(404).json({ message: 'Tarefa não encontrada' })   
    return response.json(task)
  }

  async store({ request, response }) {                    //Recebe os dados do corpo da requisição (request).
    const data = request.only(['title', 'description', 'status'])
    const task = await TaskService.createTask(data)
    return response.status(201).json(task)
  }

  async update({ params, request, response }) {           // Atualiza uma tarefa específica com base no id
    const data = request.only(['title', 'description', 'status'])
    const task = await TaskService.updateTask(params.id, data)
    if (!task) return response.status(404).json({ message: 'Tarefa não encontrada' })
    return response.json(task)
  }

  async destroy({ params, response }) {                  // Exclui uma tarefa pelo id
    const task = await TaskService.deleteTask(params.id)
    if (!task) return response.status(404).json({ message: 'Tarefa não encontrada' })
    return response.json({ message: 'Tarefa removida com sucesso' })
  }
}

module.exports = TaskController
