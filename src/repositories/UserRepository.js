import sqliteConnection from "../database/sqlite/index.js"

export class UserRepository {
    async findByEmail(email) {
        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE email = (?)", [email])
        return user
    }

    async create({name, email, password}) {
        const database = await sqliteConnection()

        const userId = await database.run("INSERT INTO users (name, email, password) VALUES (?, ?, ?)",
            [name, email, password]
        )

        return {id: userId}
    }

    async findById(id) {
        const database = await sqliteConnection()
        const user = await database.get("SELECT * FROM users WHERE id = (?)", [id]);
        
        return user
    }

    async update (user) {
        const database = await sqliteConnection()

        const userUpdated = await database.run (`
            UPDATE users SET
            name = ?,
            email = ?,
            password = ?,
            updated_at = CURRENT_TIMESTAMP
            WHERE id = ?
        `, [user.name, user.email, user.password, user.id])

        return userUpdated
    }
}