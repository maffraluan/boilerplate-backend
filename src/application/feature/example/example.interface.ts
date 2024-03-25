import { Request, Response } from 'express'

export interface IExampleController {
  getFoo(_req: Partial<Request>, res: Partial<Response>): Partial<Response>
  getBar(_req: Partial<Request>, res: Partial<Response>): Partial<Response>
}
