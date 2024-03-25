import { ExampleController, IExampleController } from '@/application/feature'
import { container } from 'tsyringe'

container.registerSingleton<IExampleController>(
  'ExampleController',
  ExampleController
)
