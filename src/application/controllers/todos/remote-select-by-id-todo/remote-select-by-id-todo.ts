import { Request, Response } from 'express'
import { TodoListRepository } from '../../../repository/todo/todo-list.repository'

type Params = {
  id: string
}

export class RemoteSelectByIdTodoController {
  constructor(private repository: TodoListRepository) {}

  public selectById = async (req: Request, res: Response) => {
    const params = req?.query as Params

    const succesOrError = await this.repository.selectById(+params?.id)

    if (succesOrError.isError()) {
      return res
        .status(succesOrError.value.statusCode)
        .json(succesOrError.value.message)
    }

    return res.status(200).json(succesOrError.value)
  }
}
