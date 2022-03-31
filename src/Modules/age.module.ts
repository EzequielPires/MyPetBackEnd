import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AgeController } from "src/Controllers/age.controller";
import { Age } from "src/Models/age.entity";
import { AgeService } from "src/Services/age.service";

@Module({
    imports: [TypeOrmModule.forFeature([Age])],
    controllers: [AgeController],
    providers: [AgeService],
    exports: []
}) export class AgeModule {}