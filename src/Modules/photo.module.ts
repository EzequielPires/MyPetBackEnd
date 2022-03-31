import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { PhotoController } from "src/Controllers/photo.controller";
import { Photo } from "src/Models/photo.entity";
import { PhotoService } from "src/Services/photo.service";

@Module({
    imports: [TypeOrmModule.forFeature([Photo])],
    controllers: [PhotoController],
    providers: [PhotoService],
})
export class PhotoModule {}