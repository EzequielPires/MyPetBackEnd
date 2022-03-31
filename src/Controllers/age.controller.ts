import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { AgeService } from "src/Services/age.service";

@Controller('age')
export class AgeController {
    constructor(private readonly ageService: AgeService) {}
    @Post()
    create(@Body() body) {
        return this.ageService.create(body);
    }

    @Get()
    findAll() {
        return this.ageService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.ageService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body) {
        return this.ageService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.ageService.delete(id);
    }
}