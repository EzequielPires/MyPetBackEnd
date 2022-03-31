import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { ShelterService } from "src/Services/shelter.service";

@Controller('shelters')
export class ShelterController {
    constructor(private readonly shelterService: ShelterService) {}

    @Post()
    create(@Body() body) {
        return this.shelterService.create(body);
    }

    @Get()
    findAll() {
        return this.shelterService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.shelterService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() body) {
        return this.shelterService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.shelterService.delete(id);
    }
}