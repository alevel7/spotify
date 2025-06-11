export const connection: Connection = {
    CONNECTION_STRING: "some connection",
    DB:"some database name",
    DB_NAME: "some databasename"
}

export type Connection = {
    CONNECTION_STRING:string;
    DB: string;
    DB_NAME: string;
}