export default class NotesIndexService {
    constructor({notesRepository, tagsRepository}) {
        this.notesRepository = notesRepository;
        this.tagsRepository = tagsRepository;
    }

    async execute ({title, tags, user_id}) {
        let notes;

        if (tags) {
            const filterTags = tags.split(',').map(tag => tag.trim())

            notes = await this.notesRepository.findJoinTags({title, tags: filterTags, user_id});
        } else {
            notes = await this.notesRepository.findByTitle({user_id, title}) 
        }

        const userTags = await this.tagsRepository.index({user_id})
        const notesWithTags = notes.map(note => {
            const noteTags = userTags.filter(tag => tag.note_id == note.id)
            return {
                ...note,
                tags: noteTags
            }
        })
        console.log(notesWithTags)

        return notesWithTags;
    }
}