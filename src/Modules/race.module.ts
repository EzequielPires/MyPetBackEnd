import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RaceController } from "src/Controllers/race.controller";
import { Race } from "src/Models/race.entity";
import { RaceService } from "src/Services/race.service";

@Module({
    imports: [TypeOrmModule.forFeature([Race])],
    controllers: [RaceController],
    providers: [RaceService],
    exports: [],
})
export class RaceModule {

}