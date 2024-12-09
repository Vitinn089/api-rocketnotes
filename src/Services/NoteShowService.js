import { AppError } from '../utils/AppError.js'

export default class NoteShowService {
    constructor({notesRepository, tagsRepository, linksRepository}) {
        this.notesRepository = notesRepository;
        this.tagsRepository = tagsRepository;
        this.linksRepository = linksRepository;
    }

    async execute({id}) {
        const note = await this.notesRepository.show({id})
        
        if(!note) 
            return {}
        
        const tags = await this.tagsRepository.findByNoteId({note_id: id})
        const links = await this.linksRepository.findByNoteId({note_id: id})

        return {
            ...note,
            tags,
            links
        }
    }
}