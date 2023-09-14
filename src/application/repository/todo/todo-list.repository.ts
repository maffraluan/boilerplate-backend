import { TodoListModel } from '../../../domain/models/todo-list/todo-list'
import { Either, isSuccess, isError } from '../../../domain/common/types/either'
import { ResponseOrError } from '../../../domain/exceptions/error-handlers'

type Todo = {
  title: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
}

type CreateParams = Omit<Todo, 'updatedAt'>

type UpdateParams = Omit<Todo, 'createdAt'> & {
  id: number
}

export interface ITodoListRepository {
  save(todo: CreateParams): Promise<Either<ResponseOrError, TodoListModel>>
  update(todo: UpdateParams): Promise<Either<ResponseOrError, TodoListModel>>
  delete(todoId: number): Promise<Either<ResponseOrError, string>>
  selectById(todoId: number): Promise<Either<ResponseOrError, TodoListModel>>
  selectAll(): Promise<Either<ResponseOrError, TodoListModel[]>>
}

export class TodoListRepository implements ITodoListRepository {
  async save({
    ...params
  }: CreateParams): Promise<Either<ResponseOrError, TodoListModel>> {
    const succesOrError = await TodoListModel.create({
      title: params?.title,
      description: params?.description,
      status: params?.status,
      createdAt: params?.createdAt,
    })

    if (!succesOrError) {
      return isError(new ResponseOrError('Failed to create Todo', 400))
    }

    return isSuccess(succesOrError)
  }
  async update(
    params: UpdateParams
  ): Promise<Either<ResponseOrError, TodoListModel>> {
    const successOrError = await TodoListModel.findOne({
      where: {
        id: params?.id,
      },
    })

    if (!successOrError?.id) {
      return isError(new ResponseOrError('Todo not found!', 404))
    }

    successOrError.title = params?.title
    successOrError.description = params?.description
    successOrError.status = params?.status
    successOrError.updatedAt = params?.updatedAt

    const updatedSuccessOrError = await successOrError.save()

    return isSuccess(updatedSuccessOrError)
  }
  async delete(id: number): Promise<Either<ResponseOrError, string>> {
    const successOrError = await TodoListModel.findOne({
      where: {
        id: id,
      },
    })

    if (!successOrError) {
      return isError(new ResponseOrError('Todo not found!'))
    }

    await successOrError.destroy()

    return isSuccess('Deleted successfully!')
  }
  async selectById(
    id: number
  ): Promise<Either<ResponseOrError, TodoListModel>> {
    const successOrError = await TodoListModel.findOne({
      where: {
        id: id,
      },
    })

    if (!successOrError?.id) {
      return isError(new ResponseOrError('Todo not found!', 404))
    }

    return isSuccess(successOrError)
  }
  async selectAll(): Promise<Either<ResponseOrError, TodoListModel[]>> {
    const successOrError = await TodoListModel.findAll()

    if (!successOrError) {
      return isError(new ResponseOrError('Empty list', 404))
    }

    return isSuccess(successOrError)
  }
}
