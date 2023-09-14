import { Request } from 'express'
import { TodoListRepository } from '../../../repository/todo/todo-list.repository'
import { RemoteUpdateTodoController } from './remote-update-todo'

describe('RemoteUpdateTodoController', () => {
  let controller: RemoteUpdateTodoController
  let repository: TodoListRepository

  beforeEach(() => {
    repository = {} as TodoListRepository
    controller = new RemoteUpdateTodoController(repository)
  })

  it('should update a todo', async () => {
    const req = {
      body: {
        id: 1,
        title: 'Updated Todo',
        description: 'Updated Description',
        status: 'Completed',
      },
    } as Request

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any

    repository.update = jest.fn().mockResolvedValue({
      value: {},
      isError: () => false,
    })

    await controller.update(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({})
  })

  it('should handle errors when updating a todo', async () => {
    const req = {
      body: {
        id: 1,
        title: 'Updated Todo',
        description: 'Updated Description',
        status: 'Completed',
      },
    } as Request

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any

    repository.update = jest.fn().mockResolvedValue({
      value: { statusCode: 500, message: 'Internal Server Error' },
      isError: () => true,
    })

    await controller.update(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith('Internal Server Error')
  })
})
