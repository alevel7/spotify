
export default () => ({
    PORT: parseInt(process.env.PORT || '3000') ,
    DBTYPE: process.env.DBTYPE,
    DB_HOST: process.env.DB_HOST,
    DB_PORT: parseInt(process.env.DB_PORT || '5432'),
    USERNAME: process.env.USERNAME,
    PASSWORD: process.env.PASSWORD,
    DATABASE: process.env.DATABASE,
    NODE_ENV: process.env.NODE_ENV,
    SECRET: process.env.SECRET,
})