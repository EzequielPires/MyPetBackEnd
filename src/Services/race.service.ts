import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Race } from "src/Models/race.entity";
import { Repository } from "typeorm";

export class RaceService {
    constructor(@InjectRepository(Race) private raceRepository: Repository<Race>) {}

    async create (body) {
        try {
            const race = await this.raceRepository.save(body);
            return {
                success: true,
                data: race
            }
        } catch (error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }

    async findAll () {
        const list = await this.raceRepository.find();
        return { data: list }
    }

    async findOne (id: number) {
        const race = await this.raceRepository.findOne({
            where: {id}
        })
        return { data: race }
    }

    async update (id: number, body) {
        const race = await this.raceRepository.findOne({
            where: { id }
        })

        if (!race) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com id ${id}`);
        }

        await this.raceRepository.update({ id }, body);

        return {
            success: true,
            data: await this.raceRepository.findOne({
                where: { id }
            })
        }
    }

    async delete (id: number) {
        const race = await this.raceRepository.findOne({
            where: { id }
        })

        if (!race) {
            throw new NotFoundException(`Não foi encontrado nenhuma raça com id ${id}`);
        }

        await this.raceRepository.delete(id)

        return {
            success: true,
            data: {
                message: `Raça com id ${id} removido com sucesso`
            }
        }
    }
}