import 'dotenv/config'
import path from 'node:path'
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export  default {
  development: {
	client: 'pg',
    connection: process.env.DATABASE_URL,
	useNullAsDefault: true,
	migrations: {
		directory: path.resolve(__dirname, "src", "database", "knex", "migrations")
	}
  }
};
