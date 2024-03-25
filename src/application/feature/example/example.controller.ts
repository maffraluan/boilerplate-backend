import { Request, Response } from 'express'

import { injectable } from 'tsyringe'
import { IExampleController } from './example.interface'

@injectable()
export class ExampleController implements IExampleController {
  public getFoo = (_req: Request, res: Response) => {
    console.log('bar')
    return res.status(200).json({ foo: 'foo' })
  }
}
