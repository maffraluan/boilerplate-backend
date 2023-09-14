import { Request, Response } from 'express'
import { TodoListRepository } from '../../../repository/todo/todo-list.repository'

import { Todo } from '../types/todo.types'
import { convertTimezone } from '../../../../helpers/convert-timezone/convert-timezone'

type UpdateParams = Omit<Todo, 'createdAt'> & {
  id: number
}

export class RemoteUpdateTodoController {
  constructor(private repository: TodoListRepository) {}
  public update = async (req: Request, res: Response) => {
    const params = req?.body as UpdateParams

    const createDate = new Date().toISOString()

    const successOrError = await this.repository.update({
      id: params?.id,
      title: params?.title,
      description: params?.description,
      status: params?.status,
      updatedAt: convertTimezone(createDate),
    })

    if (successOrError.isError()) {
      return res
        .status(successOrError.value.statusCode)
        .json(successOrError.value.message)
    }

    return res.status(201).json(successOrError.value)
  }
}
