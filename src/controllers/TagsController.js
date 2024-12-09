import knex from "../database/knex/index.js";

import TagsRepository from "../repositories/TagsRepository.js";
import TagsIndexService from "../Services/TagsIndexService.js";

export class TagsController {
    async index(request, response) {
        const user_id = request.user.id

        const tagsRepository = new TagsRepository();
        const tagsIndexService = new TagsIndexService(tagsRepository);

        const tags = await tagsIndexService.execute({userId: user_id})

        return response.json(tags)
    }
}