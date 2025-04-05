'use strict'

class TaskValidator {
  get rules () {
    return {
      title: 'required|string',
      description: 'string',
      status: 'required|in:pendente,em andamento,concluído'
    }
  }

  get messages () {
    return {
      'title.required': 'O título da tarefa é obrigatório.',
      'title.string': 'O título deve ser um texto.',
      'description.string': 'A descrição deve ser um texto.',
      'status.required': 'O status é obrigatório.',
      'status.in': 'O status deve ser pendente, em andamento ou concluído.'
    }
  }

  async fails (errorMessages) {
    console.log('Erro de validação:', errorMessages)         // Exibe os erros no terminal
    return this.ctx.response.status(400).send(errorMessages) // Retorna os erros na API
  }

}

module.exports = TaskValidator
