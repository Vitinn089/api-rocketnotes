export default class TagsIndexService {
    constructor(tagsRepository) {
        console.log(tagsRepository)
        this.tagsRepository = tagsRepository;
    }

    async execute({userId}) {

        const tags = await this.tagsRepository.index({user_id: userId})
        
        return tags
    }
}