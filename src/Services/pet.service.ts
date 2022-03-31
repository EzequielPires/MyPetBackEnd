import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Pet } from "src/Models/pet.entity";
import { Repository } from "typeorm";

export class PetService {
    constructor(@InjectRepository(Pet) private petRepository: Repository<Pet>) { }

    async create(body: Pet, user: any) {
        const pet = {
            name: body.name,
            type: body.type,
            race: body.race,
            age: body.age,
            gender: body.gender,
            shelter: body.shelter,
            user: user.id
        }
        try {
            const res = await this.petRepository.save(pet);
            return { success: true, data: res }
        } catch (error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }
    async filter(page: number, limit: number, type: string) {
        try {
            const list = await this.petRepository.find({
                relations: ['user', 'photos'],
                where: {type: type}
            })
            return {
                sucess: true,
                data: list
            }
        } catch (error) {
            return {
                sucess: false,
                message: error.message
            }
        }
    }
    async findAllUser(id: any) {
        try {
            const list = await this.petRepository.find({ relations: ['photos', 'shelter', 'user'], where: {user: id} });
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

    async findAll() {
        try {
            const list = await this.petRepository.find({ relations: ['photos', 'shelter', 'user'] });
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

    async findOne(id: number) {
        const pet = await this.petRepository.findOne({
            relations: ['photos', 'shelter'],
            where: { id }
        })

        if (!pet) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com id ${id}`);
        }
        return {
            success: true,
            data: pet
        }
    }

    async update(id: number, body: Pet) {
        const pet = await this.petRepository.findOne({
            where: { id }
        })

        if (!pet) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com id ${id}`);
        }

        await this.petRepository.update({ id }, body);

        return {
            success: true,
            data: await this.petRepository.findOne({
                where: { id }
            })
        }
    }

    async delete(id: number) {
        const pet = await this.petRepository.findOne({
            where: { id }
        })

        if (!pet) {
            throw new NotFoundException(`Não foi encontrado nenhum usuário com id ${id}`);
        }

        await this.petRepository.delete(id)

        return {
            success: true,
            data: {
                message: `Abrigo com id ${id} removido com sucesso`
            }
        }
    }
}