'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})

Route.get('/tasks', 'TaskController.index')// Listar todas
Route.post('/tasks', 'TaskController.store').validator('Task')// Criar nova
Route.get('/tasks/:id', 'TaskController.show')// Obter detalhes
Route.put('/tasks/:id', 'TaskController.update').validator('Task')// Atualizar
Route.delete('/tasks/:id', 'TaskController.destroy')  // Remover
