import { Request, Response } from 'express'

import { injectable } from 'tsyringe'

import { ISimpleController } from './simple.interface'

@injectable()
export class SimpleController implements ISimpleController {
  public getFooBar = (_req: Request, res: Response) => {
    console.log('bar')
    return res.status(200).json({ foo: 'bar' })
  }
}
