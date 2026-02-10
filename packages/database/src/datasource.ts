import { DataSource } from 'typeorm'

const dataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT as string, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  ssl: process.env.DB_SSL?.trim().toLowerCase() === 'true',
  schema: 'public',
  migrations: [__dirname + '/migrations/*.ts'],
  entities: [__dirname + '/entities/**/*.entity{.ts,.js}'],
})

export default dataSource
