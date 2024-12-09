export default class NoteCreateService {
    constructor({notesRepository, tagsRepository, linksRepository}) {
        this.notesRepository = notesRepository;
        this.tagsRepository = tagsRepository;
        this.linksRepository = linksRepository;
    }
    
    async execute({ title, description, tags, links, user_id  }) {
        const  note_id = await this.notesRepository.create({title, description, user_id})

        const linksInsert = links.map(link => {
            return {
                note_id: note_id[0],
                url: link
            }
        })

        await this.linksRepository.create({linksInsert})

        const tagsInsert = tags.map(name => {
            return {
                note_id: note_id[0],
                name,
                user_id
            }
        })

        await this.tagsRepository.create({tags: tagsInsert})
    }
}