import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Post, Res, UploadedFile, UseInterceptors } from "@nestjs/common";
import { diskStorage } from "multer";
import { FileInterceptor } from "@nestjs/platform-express";
import { PhotoService } from "src/Services/photo.service";
import { editFileName, imageFileFilter } from "src/helper/EditNameFile";

@Controller('photos')
export class PhotoController {
    constructor(private readonly photoService: PhotoService) { }

    @Post('upload/:id')
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: './storage',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    uploadFile(@UploadedFile() file: Express.Multer.File, @Param('id', ParseIntPipe) id: number) {
        return this.photoService.uploadFile(file, id);
    }

    @Post('upload/avatar/:id')
    @UseInterceptors(FileInterceptor("file", {
        storage: diskStorage({
            destination: './storage',
            filename: editFileName,
        }),
        fileFilter: imageFileFilter,
    }))
    async upload(@UploadedFile() file: Express.Multer.File, @Param('id', ParseUUIDPipe) id: string) {
        return this.photoService.uploadAvatarUser(file, id);
    }

    @Get(':imgpath')
    view(@Param('imgpath') path: string, @Res() res) {
        return this.photoService.view(path, res);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.photoService.delete(id);
    }
}