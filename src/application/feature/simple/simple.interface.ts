import { Request, Response } from 'express'

export interface ISimpleController {
  getFooBar(_req: Partial<Request>, res: Partial<Response>): Partial<Response>
}
