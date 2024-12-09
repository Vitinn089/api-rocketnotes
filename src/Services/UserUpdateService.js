import { AppError } from "../utils/AppError.js";
import pkg from 'bcryptjs';
const { hash, compare } = pkg;


export default class UserUpdateService {
    constructor(userRepository) {
        this.userRepository = userRepository
    }

    async execute({name, email, password, old_password, id}) {
        const user = await this.userRepository.findById(id);

        if (!user)
            throw new AppError('Usuário não encontrado!');
        
        const userWithUpdatedEmail = await this.userRepository.findByEmail(email);

        if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id)
            throw new AppError('Este e-mail já está em uso.')

        user.name = name ?? user.name;
        user.email = email ?? user.email;

        if(password && !old_password) 
            throw new AppError('Você precisa informar a senha antiga para definir a nova senha!')

        if (password && old_password) {
            const checkOldPassword = await compare(old_password, user.password)

            if (!checkOldPassword)
                throw new AppError('A senha antiga não confere.');

            user.password = await hash(password, 8)
        }

        return await this.userRepository.update(user)
    }
}