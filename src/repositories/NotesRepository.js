import knex from "../database/knex/index.js";

export class NotesRepository {
    async create ({title, description, user_id}) {
        const  note_id = await knex("notes").insert({
            title,
            description,
            user_id
        });

        return note_id;
    }

    async show({id}) {
        const note = await knex("notes").where({id}).first();

        return note;
    }

    async delete({id}) {
        await knex("notes").where({ id }).delete();
    }

    async findByTitle({title, user_id}) {
        const notes = await knex("notes")
                .where({ user_id })
                .whereLike("title", `%${title}%`)
                .orderBy("title")

        return notes;
    }

    async findJoinTags({user_id, title, tags}) {
        notes = await knex("tags")
            .select([
                "notes.id",
                "notes.title",
                "notes.user_id"
            ])
            .where("notes.user_id", user_id)
            .whereLike("notes.title", `%${title}%`)
            .whereIn("name", tags)
            .innerJoin("notes", "notes.id", "tags.note_id")
            .orderBy("notes.id")
            .groupBy("title")

        return notes;
    }
}