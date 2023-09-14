import { Request, Response } from 'express'
import { TodoListRepository } from '../../../repository/todo/todo-list.repository'

type Params = {
  id: string
}

export class RemoteDeleteTodoController {
  constructor(private repository: TodoListRepository) {}

  public delete = async (req: Request, res: Response) => {
    const params = req?.query as Params

    const succesOrError = await this.repository.delete(+params?.id)

    if (succesOrError.isError()) {
      return res
        .status(succesOrError.value.statusCode)
        .json(succesOrError.value.message)
    }

    return res.status(204).json(succesOrError.value)
  }
}
