import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Race } from "src/Models/race.entity";
import { Type } from "src/Models/type.entity";
import { Repository } from "typeorm";

export class TypeService {
    constructor(@InjectRepository(Type) private typeRepository: Repository<Type>) {}

    async create (body) {
        try {
            const type = await this.typeRepository.save(body);
            return {
                success: true,
                data: type
            }
        } catch (error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async findAll () {
        const list = await this.typeRepository.find();
        return { data: list }
    }

    async findOne (id: number) {
        const type = await this.typeRepository.findOne({
            where: {id}
        })
        return { data: type }
    }

    async update (id: number, body) {
        const type = await this.typeRepository.findOne({
            where: { id }
        })

        if (!type) {
            throw new NotFoundException(`Não foi encontrado nenhum tipo com id ${id}`);
        }

        await this.typeRepository.update({ id }, body);

        return {
            success: true,
            data: await this.typeRepository.findOne({
                where: { id }
            })
        }
    }

    async delete (id: number) {
        const type = await this.typeRepository.findOne({
            where: { id }
        })

        if (!type) {
            throw new NotFoundException(`Não foi encontrado nenhum tipo com id ${id}`);
        }

        await this.typeRepository.delete(id)

        return {
            success: true,
            data: {
                message: `Tipo com id ${id} removido com sucesso`
            }
        }
    }
}