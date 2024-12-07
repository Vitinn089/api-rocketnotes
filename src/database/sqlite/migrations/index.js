import sqliteConnection from '../../sqlite/index.js'
import { createUsers } from './createUsers.js'

export async function migrationsRun() {
    const schemas = [
        createUsers
    ].join(' ')

    sqliteConnection()
        .then((db) => db.exec(schemas))
        .catch(error => console.error(error))
}