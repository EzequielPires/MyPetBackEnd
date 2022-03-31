import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Post, Put, Query, Req, UseFilters, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { HttpExceptionFilter } from "src/Filters/http-exception.filter";
import { PetService } from "src/Services/pet.service";

@Controller('pets')
@UseFilters(new HttpExceptionFilter())
export class PetController {
    constructor(private readonly petService: PetService) {}

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(@Body() body, @Req() req: any) {
        return this.petService.create(body, req.user);
    }

    @Get('list-pets')
    index(
        @Query('page') page: number = 1,
        @Query('limit') limit: number = 10,
        @Query('type') type: string
    ) {
        return this.petService.filter(page, limit, type);
    }

    @Get()
    findAll() {
        return this.petService.findAll();
    }

    @Get('my-pets')
    @UseGuards(AuthGuard('jwt'))
    findAllUser(@Req() req: any) {
        return this.petService.findAllUser(req.user);
    }

    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.petService.findOne(id);
    }

    @Put(':id')
    @UseGuards(AuthGuard('jwt'))
    update(@Param('id', ParseIntPipe) id: number, @Body() body) {
        return this.petService.update(id, body);
    }

    @Delete(':id')
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id', ParseIntPipe) id: number) {
        return this.petService.delete(id);
    }
}