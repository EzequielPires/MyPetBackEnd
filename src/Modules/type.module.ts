import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TypeController } from "src/Controllers/type.controller";
import { Type } from "src/Models/type.entity";
import { TypeService } from "src/Services/type.service";

@Module({
    imports: [TypeOrmModule.forFeature([Type])],
    controllers: [TypeController],
    providers: [TypeService],
    exports: []
}) export class TypeModule {}