import { Request, Response } from 'express'
import { TodoListRepository } from '../../../repository/todo/todo-list.repository'

import { Todo } from '../types/todo.types'

type CreateParams = Omit<Todo, 'updatedAt'>

export class RemoteCreateTodoController {
  constructor(private repository: TodoListRepository) {}
  public create = async (req: Request, res: Response) => {
    const params = req?.body as CreateParams

    const createDate = new Date().toISOString()

    const successOrError = await this.repository.save({
      title: params?.title,
      description: params?.description,
      status: params?.status,
      createdAt: createDate,
    })

    if (successOrError.isError()) {
      return res
        .status(successOrError.value.statusCode)
        .json(successOrError.value.message)
    }

    return res.status(201).json(successOrError.value)
  }
}
