import { Request, Response } from 'express'
import { TodoListRepository } from '../../../repository/todo/todo-list.repository'

export class RemoteSelectAllTodoController {
  constructor(private repository: TodoListRepository) {}
  public selectAll = async (_: Request, res: Response) => {
    const successOrError = await this.repository.selectAll()

    if (successOrError.isError()) {
      return res
        .status(successOrError.value.statusCode)
        .json(successOrError.value)
    }

    return res.status(200).json(successOrError.value)
  }
}
