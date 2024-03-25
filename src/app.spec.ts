import { App } from './app'

describe('App', () => {
  let sut: App
  beforeAll(async () => {
    sut = new App()
    await sut.startApp()
  })

  it('should create an instance of App successfully', () => {
    expect(sut).toBeInstanceOf(App)
  })
})
