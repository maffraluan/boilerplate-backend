import { Model, Table, Column, DataType } from 'sequelize-typescript'

@Table({
  tableName: 'todo',
})
export class TodoListModel extends Model {
  public static TODO_ID = 'id' as string
  public static TODO_TITLE = 'title' as string
  public static TODO_DESCRIPTION = 'description' as string
  public static TODO_STATUS = 'status' as string
  public static TODO_CREATED_AT = 'createdat' as string
  public static TODO_UPDATE_AT = 'updatedAt' as string

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: TodoListModel.TODO_ID,
  })
  id!: number

  @Column({
    type: DataType.STRING(100),
    field: TodoListModel.TODO_TITLE,
  })
  title!: string

  @Column({
    type: DataType.STRING(255),
    field: TodoListModel.TODO_DESCRIPTION,
  })
  description!: string

  @Column({
    type: DataType.STRING(255),
    field: TodoListModel.TODO_STATUS,
  })
  status!: string

  @Column({
    type: DataType.DATE,
    field: TodoListModel.TODO_CREATED_AT,
  })
  createdAt!: string

  @Column({
    type: DataType.DATE,
    field: TodoListModel.TODO_UPDATE_AT,
  })
  updatedAt!: string
}
