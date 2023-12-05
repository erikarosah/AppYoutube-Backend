import path from "path";

export default {
  useNullAsDefault: true,
  client: 'sqlite3',
  connection: {
    filename: path.resolve(__dirname, "src", "database", "database.db"),
  }, 
  pool: {
    afterCreate: (conn:any, cb:Function) => conn.run("PRAGMA foreign_keys = ON", cb)
  },
  migrations: {
    directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
  }
};
