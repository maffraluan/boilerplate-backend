import { TodoListRepository } from '../../../repository/todo/todo-list.repository'
import { RemoteSelectByIdTodoController } from './remote-select-by-id-todo'

describe('RemoteSelectAllTodoController', () => {
  let controller: RemoteSelectByIdTodoController
  let repository: TodoListRepository

  beforeEach(() => {
    repository = {} as TodoListRepository
    controller = new RemoteSelectByIdTodoController(repository)
  })

  const mockData: Record<string, string | number> = {
    id: 1,
    title: 'Something goodssss',
    description: 'Loren',
    status: 'A fazer',
    createdAt: '2023-09-14T02:33:26.354Z',
    updatedAt: '2023-09-14T02:33:26.358Z',
  }

  it('should return a unique todo', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn().mockReturnValue(mockData),
    } as any

    repository.selectById = jest.fn().mockResolvedValue({
      value: {},
      isError: () => false,
    })

    await controller.selectById({} as any, res)

    expect(res.status).toHaveBeenCalledWith(200)
    expect(res.json).toHaveBeenCalledWith({})
  })

  it('should handle errors when getting unique todo', async () => {
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as any

    repository.selectById = jest.fn().mockResolvedValue({
      value: { message: 'Todo not found!', statusCode: 404 },
      isError: () => true,
    })

    await controller.selectById({} as any, res)

    expect(res.status).toHaveBeenCalledWith(404)
    expect(res.json).toHaveBeenCalledWith('Todo not found!')
  })
})
