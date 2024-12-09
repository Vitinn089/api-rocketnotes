import knex from "../database/knex/index.js";

export class UserRepository {
    constructor(db) {
        this.db = db;
    }
    async findByEmail(email) {
        const user = await knex("users").where({email}).first();

        return user
    }

    async create({name, email, password}) {
        const userId = await knex("users").insert({name, email, password})

        return {id: userId}
    }

    async findById(id) {
        const user = await knex("users").where({id}).first();
        
        return user
    }

    async update (user) {
        const userUpdated = await knex("users").where({id: user.id}). update({
            name: user.name,
            email: user.email,
            password: user.password,

            updated_at: knex.fn.now(6)
        })

        return userUpdated
    }
}