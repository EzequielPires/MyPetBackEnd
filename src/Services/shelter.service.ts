import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Shelter } from "src/Models/shelter.entity";
import { Repository } from "typeorm";

export class ShelterService {
    constructor(@InjectRepository(Shelter) private userRepository: Repository<Shelter>) { }

    async create(body: Shelter) {
        try {
            const user = await this.userRepository.save(body);
            return { success: true, data: {user}}
        } catch(error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async findAll() {
        try {
            const list = await this.userRepository.find({relations: ['user']});
            return {
                success: true,
                data: list
            }
        } catch(error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async findOne(id: string) {
        const user = await this.userRepository.findOne({
            where: {id}
        })

        if(!user) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com id ${id}`);
        }
        return {
            success: true,
            data: user
        }
    }

    async update(id: string, body: Shelter) {
        const user = await this.userRepository.findOne({
            where: {id}
        })

        if(!user) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com id ${id}`);
        }

        await this.userRepository.update({id}, body);

        return {
            success: true,
            data: await this.userRepository.findOne({
                where: {id}
            })
        }
    }

    async delete(id) {
        const user = await this.userRepository.findOne({
            where: {id}
        })

        if(!user) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com id ${id}`);
        }

        await this.userRepository.delete(id)

        return {
            success: true,
            data: {
                message: `Abrigo com id ${id} removido com sucesso`
            }
        }
    }
}