import knex from "../database/knex/index.js";
import LinksRepository from "../repositories/LinksRepository.js";
import { NotesRepository } from "../repositories/NotesRepository.js";
import TagsRepository from "../repositories/TagsRepository.js";

import NoteCreateService from "../Services/NoteCreateService.js";
import NoteDeleteService from "../Services/NoteDeleteService.js";
import NoteShowService from "../Services/NoteShowService.js";
import NotesIndexService from "../Services/NotesIndexService.js";

export class NotesController {
    async create (request, response) {
        const { title, description, tags, links  } = request.body
        const user_id = request.user.id

        const notesRepository = new NotesRepository()
        const tagsRepository = new TagsRepository()
        const linksRepository = new LinksRepository()

        const noteCreateService = new NoteCreateService({notesRepository, tagsRepository, linksRepository})

        await noteCreateService.execute({ title, description, tags, links, user_id  });

        return response.status(201).json( )
    }

    async show (request, response) {
        const { id } = request.params

        const notesRepository = new NotesRepository()
        const tagsRepository = new TagsRepository()
        const linksRepository = new LinksRepository()

        const noteShowService = new NoteShowService({notesRepository, tagsRepository, linksRepository})

        const res = await noteShowService.execute({id})

        return response.json(res)
    }

    async delete (request, response) {
        const { id } = request.params
        
        const notesRepository = new NotesRepository()
        const noteDeleteService = new NoteDeleteService(notesRepository)

        await noteDeleteService.execute({id})

        return response.json( )
    }
    
    async index (request, response) {
        const {  title, tags } = request.query
        const user_id = request.user.id

        const notesRepository = new NotesRepository();
        const tagsRepository = new TagsRepository();

        const notesIndexService = new NotesIndexService({notesRepository, tagsRepository});

        const notes = await notesIndexService.execute({title, tags, user_id})

        return response.json(notes)
    }
}