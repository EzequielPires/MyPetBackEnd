import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserController } from "src/Controllers/user.controller";
import { User } from "src/Models/user.entity";
import { UserService } from "src/Services/user.service";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {}