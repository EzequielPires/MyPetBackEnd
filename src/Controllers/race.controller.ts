import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { RaceService } from "src/Services/race.service";

@Controller('race')
export class RaceController {
    constructor(private readonly raceService: RaceService) {}
    @Post()
    create(@Body() body) {
        return this.raceService.create(body);
    }

    @Get()
    findAll() {
        return this.raceService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.raceService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body) {
        return this.raceService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.raceService.delete(id);
    }
}