export default class NoteDeleteService {
    constructor(notesRepository) {
        this.notesRepository = notesRepository;
    }
    async execute({id}) {
        const result = this.notesRepository.delete({id})

        return result
    }
}