import { UserRepository } from "../repositories/userRepository.js";

import UserCreateService from '../Services/UserCreateService.js';
import UserUpdateService from '../Services/UserUpdateService.js';


export class UsersController {
    async create(request, response) {
        const { name, email, password } = request.body

        const userRepository = new UserRepository()
        const userCreateService = new UserCreateService(userRepository)

        await userCreateService.execute({name, email, password})

        return response.status(201).json( )
    }

    async update(request, response) {
        const { name, email, password, old_password } = request.body;
        const user_id = request.user.id;

        const userRepository = new UserRepository();
        const userUpdatedService = new UserUpdateService(userRepository);

        await userUpdatedService.execute({name, email, password, old_password, id: user_id})

        return response.status(200).json();
    }
}