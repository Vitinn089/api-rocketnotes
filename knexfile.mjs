import path from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export  default {
  development: {
	client: 'sqlite3',
    connection: {
    	filename: path.resolve(__dirname, "src", "database", "database.db")
    },
	pool: {
		afterCreate: (conn, cb) => conn.run("PRAGMA foreign_keys = ON", cb)
	},
	useNullAsDefault: true,
	migrations: {
		directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
	}
  }
};
