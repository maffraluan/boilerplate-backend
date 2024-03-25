import { Router } from 'express'
import { container } from 'tsyringe'
import { IRoutes } from './interfaces'
import { ExampleRouter, SimpleRouter } from './presentation'

export class AppRouting {
  private router: Router
  constructor() {
    this.router = Router()
    this.setupRoutes()
  }

  private setupRoutes(): void {
    const simpleRouter = container.resolve(SimpleRouter)
    const exampleRouter = container.resolve(ExampleRouter)

    this.router.use(simpleRouter.path, simpleRouter.router)
    this.router.use(exampleRouter.path, exampleRouter.router)
  }

  public getRoutes(): IRoutes[] {
    return [{ path: '/', router: this.router }]
  }
}
