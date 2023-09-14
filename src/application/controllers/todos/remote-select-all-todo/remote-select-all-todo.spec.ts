import { TodoListRepository } from '../../../repository/todo/todo-list.repository'
import { RemoteSelectAllTodoController } from './remote-select-all-todo'

describe('RemoteSelectAllTodoController', () => {
  let controller: RemoteSelectAllTodoController
  let repository: TodoListRepository

  beforeEach(() => {
    repository = {} as TodoListRepository
    controller = new RemoteSelectAllTodoController(repository)
  })

  const mockData: Record<string, string | number> = {
    id: 1,
    title: 'Something goodssss',
    description: 'Loren',
    status: 'A fazer',
    createdAt: '2023-09-14T02:33:26.354Z',
    updatedAt: '2023-09-14T02:33:26.358Z',
  }

  it('should return a list of todos', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnValue(mockData),
    } as any

    repository.selectAll = jest.fn().mockResolvedValue({
      value: {},
      isError: () => false,
    })

    await controller.selectAll({} as any, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({})
  })

  it('should handle errors when getting all todos', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any

    repository.selectAll = jest.fn().mockResolvedValue({
      value: { message: 'Empty list', statusCode: 404 },
      isError: () => true,
    })

    await controller.selectAll({} as any, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith({
      message: 'Empty list',
      statusCode: 404,
    })
  })
})
