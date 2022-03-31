import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TypeService } from "src/Services/type.service";

@Controller('type')
export class TypeController {
    constructor(private readonly typeService: TypeService) {}
    @Post()
    create(@Body() body) {
        return this.typeService.create(body);
    }

    @Get()
    findAll() {
        return this.typeService.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.typeService.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body) {
        return this.typeService.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.typeService.delete(id);
    }
}