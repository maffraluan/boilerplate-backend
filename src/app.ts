import cluster from 'cluster'
import cors from 'cors'
import express, { Application } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import http from 'node:http'
import { cpus } from 'os'
import 'reflect-metadata'
import './domain/container/index'
// import Database from './config-database/database'
import { AppRouting } from './app-routing'

export class App {
  private static instance: App
  private app: Application

  private readonly port = process.env.PORT || 3000

  private readonly cpuLength = cpus().length

  constructor() {
    this.app = express()
    //this.databaseSync()
    this.plugins()
    this.setupRoutes()
  }

  private corsConfig = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    optionsSuccessStatus: 204
  }

  public static getInstance(): App {
    if (!App.instance) {
      App.instance = new App()
    }

    return App.instance
  }

  private plugins(): void {
    this.app.use(express.json())
    this.app.use(express.urlencoded({ extended: true }))
    this.app.use(cors(this.corsConfig))
    this.app.use(morgan('combined'))
  }

  // private databaseSync(): void {
  //   const db = new Database()
  //   db.sequelize?.sync()
  // }

  private setupRoutes(): void {
    const appRouting = new AppRouting()
    const routes = appRouting.getRoutes()
    routes.forEach((route) => {
      this.app.use(route.path, route.router)
    })
  }

  public async startApp(): Promise<void> {
    if (cluster.isPrimary) {
      for (let i = 0; i < this.cpuLength; i++) {
        cluster.fork()
      }

      cluster.on('exit', (worker) => {
        console.info(`worker ${worker.process.pid} died`)
      })
    } else {
      http.createServer(this.app).listen(this.port, () => {
        console.info(`Server is running on port ${this.port}`)
      })

      console.info(`Worker ${process.pid} started`)
    }
  }
}

App.getInstance().startApp()
