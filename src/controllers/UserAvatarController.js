import knex from "../database/knex/index.js";
import {AppError} from "../utils/AppError.js"
import { DiskStorage } from "../providers/DiskStorage.js"

export class UserAvatarController {
    async update(request, response) {
        const user_id = request.user.id
        const avatarFileName = request.file.filename

        const diskStorage = new DiskStorage();
        console.log(user_id)

        const user = await knex('users').where({id: user_id}).first();

        if (!user)
            throw new AppError("Somente usuários autenticados podem mudar o avatar", 401);

        if(user.avatar)
            await diskStorage.deleteFile(user.avatar);

        const filename = await diskStorage.saveFile(avatarFileName)
        console.log(user)
        user.avatar = filename

        await knex("users").update(user).where({id: user.id})

        return response.json(user)
    }
}