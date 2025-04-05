'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class TasksSchema extends Schema {
  up () {
    this.create('tasks', (table) => {
      table.increments()                         // id (chave primária auto incrementável)
      table.string('title').notNullable()        // título obrigatório
      table.text('description').nullable()       // descrição opcional
      table.enu('status', ['pendente', 'em andamento', 'concluído']).defaultTo('pendente')  // status com valores fixos
      table.timestamps()                         // created_at e updated_at
    })
  }

  down () {
    this.drop('tasks')
  }
}

module.exports = TasksSchema
