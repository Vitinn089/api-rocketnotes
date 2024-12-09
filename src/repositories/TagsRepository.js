import knex from "../database/knex/index.js";

export default class TagsRepository {
    async index({user_id}) {
        const tags = await knex("tags")
        .where({ user_id })
        .groupBy("name")

        return tags
    }

    async findByNoteId ({note_id}) {
        const tags = await knex("tags").where({note_id}).orderBy("name");

        return tags
    }

    async create({tags}) {
        return await knex("tags").insert(tags)
    }
}