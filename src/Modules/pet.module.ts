import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PetController } from "src/Controllers/pet.controller";
import { Pet } from "src/Models/pet.entity";
import { PetService } from "src/Services/pet.service";

@Module({
    imports: [TypeOrmModule.forFeature([Pet])],
    controllers: [PetController],
    providers: [PetService],
})
export class PetModule {}