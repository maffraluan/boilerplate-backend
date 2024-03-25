import { ISimpleController } from '@/application/feature'
import { IRoutes } from '@/interfaces'
import { Router } from 'express'

import { inject, injectable } from 'tsyringe'

@injectable()
export class SimpleRouter implements IRoutes {
  public path = '/simple'
  public router = Router()

  constructor(
    @inject('SimpleController') private readonly controller: ISimpleController
  ) {
    this.initializeRoutes()
  }

  private initializeRoutes() {
    this.router.get('/', this.controller.getFooBar)
  }
}
