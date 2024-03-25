import { ISimpleController, SimpleController } from '@/application/feature'
import { container } from 'tsyringe'

container.registerSingleton<ISimpleController>(
  'SimpleController',
  SimpleController
)
