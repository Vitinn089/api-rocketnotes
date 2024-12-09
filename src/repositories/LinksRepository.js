import knex from "../database/knex/index.js";

export default class LinksRepository {
    async create ({linksInsert}) {
        const links = await knex("links").insert(linksInsert);

        return links;
    }

    async findByNoteId({note_id}) {
        const links = await knex("links").where({note_id}).orderBy("created_at");
        
        return links;
    }
}