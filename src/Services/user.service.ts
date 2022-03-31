import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/Models/user.entity";
import { FindConditions, FindOneOptions, Repository } from "typeorm";

export class UserService {
    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    async create(body: User) {
        try {
            const user = await this.userRepository.create(body);
            return { success: true, data: await this.userRepository.save(user) }
        } catch (error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async findAll() {
        try {
            const list = await this.userRepository.find({ select: ["id", "name", "phone", "email"] });
            return {
                success: true,
                data: list
            }
        } catch (error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOne({
            select: ["id", "name", "phone", "email"],
            where: { id }
        })

        if (!user) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com id ${id}`);
        }
        return {
            success: true,
            data: user
        }
    }

    async findOneOrFail(
        conditions: FindConditions<User>,
        options?: FindOneOptions<User>,
    ) {
        console.log('email');
        try {
            return await this.userRepository.findOneOrFail(conditions, options);
          } catch (error) {
            throw new NotFoundException(error.message);
          }
    }

    async update(id: string, body: User) {
        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com id ${id}`);
        }

        await this.userRepository.update({ id }, body);

        return {
            success: true,
            data: await this.userRepository.findOne({
                where: { id }
            })
        }
    }

    async delete(id) {
        const user = await this.userRepository.findOne({
            where: { id }
        })

        if (!user) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com id ${id}`);
        }

        await this.userRepository.delete(id)

        return {
            success: true,
            data: {
                message: `Usuário com id ${id} removido com sucesso`
            }
        }
    }
}