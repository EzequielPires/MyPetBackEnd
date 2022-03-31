import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put } from "@nestjs/common";
import { UserService } from "src/Services/user.service";
import { BeforeInsert } from "typeorm";

@Controller('users')
export class UserController {
    constructor(private readonly userSevice: UserService) {}

    @Post()
    create(@Body() body) {
        return this.userSevice.create(body);
    }

    @Get()
    findAll() {
        return this.userSevice.findAll();
    }

    @Get(':id')
    findOne(@Param('id', ParseUUIDPipe) id: string) {
        return this.userSevice.findOne(id);
    }

    @Put(':id')
    update(@Param('id', ParseUUIDPipe) id: string, @Body() body) {
        return this.userSevice.update(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseUUIDPipe) id: string) {
        return this.userSevice.delete(id);
    }
}