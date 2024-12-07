import sqlite3  from 'sqlite3'
import * as sqlite from 'sqlite'
import path from 'path'
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default async function () {
    const database = await sqlite.open({
    filename: path.resolve(__dirname, "..", "database.db" ),
    driver: sqlite3.Database
    })
    return database
}