import BaseRoutes from '../base-routers/base-routers'

import {
  RemoteCreateTodoController,
  RemoteUpdateTodoController,
  RemoteSelectAllTodoController,
  RemoteDeleteTodoController,
  RemoteSelectByIdTodoController,
} from '../../../application/controllers'

import { TodoListRepository } from '../../../application/repository'
import { validate } from '../../../helpers/validates'
import {
  createTodoSchema,
  updateTodoSchema,
} from '../../../domain/schema/todo/todo-schema'

class TodoRouter extends BaseRoutes {
  public routes(): void {
    this.router.post(
      '/create-todo',
      validate(createTodoSchema),
      new RemoteCreateTodoController(new TodoListRepository()).create
    )
    this.router.put(
      '/update-todo',
      validate(updateTodoSchema),
      new RemoteUpdateTodoController(new TodoListRepository()).update
    )
    this.router.get(
      '/select-all',
      new RemoteSelectAllTodoController(new TodoListRepository()).selectAll
    )
    this.router.delete(
      '/delete-todo',
      new RemoteDeleteTodoController(new TodoListRepository()).delete
    )
    this.router.get(
      '/select-by-id',
      new RemoteSelectByIdTodoController(new TodoListRepository()).selectById
    )
  }
}

export default new TodoRouter().router
