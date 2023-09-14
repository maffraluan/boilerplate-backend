import { RemoteCreateTodoController } from './remote-create-todo'
import { TodoListRepository } from '../../../repository/todo/todo-list.repository'

describe('RemoteCreateTodoController', () => {
  let controller: RemoteCreateTodoController
  let repository: TodoListRepository

  beforeEach(() => {
    repository = {} as TodoListRepository
    controller = new RemoteCreateTodoController(repository)
  })

  it('should create a new todo', async () => {
    const req = {
      body: {
        title: 'Test Todo',
        description: 'Test Description',
        status: 'Pending',
      },
    } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any

    repository.save = jest.fn().mockResolvedValue({
      value: {},
      isError: () => false,
    })

    await controller.create(req, res)

    expect(res.status).toHaveBeenCalledWith(201)
    expect(res.json).toHaveBeenCalledWith({})
  })

  it('should handle errors when creating a todo', async () => {
    const req = {
      body: {
        title: 'Test Todo',
        description: 'Test Description',
        status: 'Pending',
      },
    } as any
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any

    repository.save = jest.fn().mockResolvedValue({
      value: { statusCode: 500, message: 'Internal Server Error' },
      isError: () => true,
    })

    await controller.create(req, res)

    expect(res.status).toHaveBeenCalledWith(500)
    expect(res.json).toHaveBeenCalledWith('Internal Server Error')
  })
})
