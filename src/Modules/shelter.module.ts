import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ShelterController } from "src/Controllers/shelter.controller";
import { Shelter } from "src/Models/shelter.entity";
import { ShelterService } from "src/Services/shelter.service";

@Module({
    imports: [TypeOrmModule.forFeature([Shelter])],
    controllers: [ShelterController],
    providers: [ShelterService],
})
export class ShelterModule {}