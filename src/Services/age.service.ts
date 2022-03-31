import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Age } from "src/Models/age.entity";
import { Repository } from "typeorm";

export class AgeService {
    constructor(@InjectRepository(Age) private ageRepository: Repository<Age>) {}

    async create (body) {
        try {
            const age = await this.ageRepository.save(body);
            return {
                success: true,
                data: age
            }
        } catch (error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async findAll () {
        const list = await this.ageRepository.find();
        return { data: list }
    }

    async findOne (id: number) {
        const age = await this.ageRepository.findOne({
            where: {id}
        })
        return { data: age }
    }

    async update (id: number, body) {
        const age = await this.ageRepository.findOne({
            where: { id }
        })

        if (!age) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com id ${id}`);
        }

        await this.ageRepository.update({ id }, body);

        return {
            success: true,
            data: await this.ageRepository.findOne({
                where: { id }
            })
        }
    }

    async delete (id: number) {
        const age = await this.ageRepository.findOne({
            where: { id }
        })

        if (!age) {
            throw new NotFoundException(`Não foi encontrado nenhuma raça com id ${id}`);
        }

        await this.ageRepository.delete(id)

        return {
            success: true,
            data: {
                message: `Raça com id ${id} removido com sucesso`
            }
        }
    }
}