import { IExampleController } from '@/application/feature'
import { IRoutes } from '@/interfaces'
import { Router } from 'express'

import { inject, injectable } from 'tsyringe'

@injectable()
export class ExampleRouter implements IRoutes {
  public path = '/example'
  public router = Router()

  constructor(
    @inject('ExampleController') private readonly controller: IExampleController
  ) {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/foo', this.controller.getFoo)
    this.router.get('/bar', this.controller.getBar)
  }
}
