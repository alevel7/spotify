import { DataSource, DataSourceOptions } from "typeorm";

export const dataSourceOptions: DataSourceOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432', 10),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'Oluranti08056965',
    database: process.env.DB_NAME || 'spotify-clone',
    synchronize: false, // Set to false in production
    logging: true, // Enable logging for debugging
    migrationsTableName: 'migrations',
    migrationsRun: false,
    entities: ['dist/**/*.entity.js'],
    migrations: ['dist/db/migrations/*.js'],
    subscribers: [],
}

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;