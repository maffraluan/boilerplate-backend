export type Todo = {
  title: string
  description: string
  status: string
  createdAt: string
  updatedAt: string
}

export enum Status {
  TODO = 'todo',
  IN_DEVELOPMENT = 'in_development',
  BLOCKED = 'blocked',
  COMPLETE = 'complete',
}
