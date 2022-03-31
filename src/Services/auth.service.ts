import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcrypt';
import { User } from "src/Models/user.entity";

@Injectable()
export class AuthService {
    constructor(
        private readonly userService: UserService,
        private readonly jwtService: JwtService,
    ) { }

    async login(user) {
        const payload = { sub: user.id, email: user.email };
        const {password, ...result} = user;

        return {
            success: true,
            user: result,
            token: this.jwtService.sign(payload),
        };
    }

    async validateUser(email: string, password: string) {
        let user: User;
        try {
            user = await this.userService.findOneOrFail({ email });
        } catch (error) {
            return null;
        }

        const isPasswordValid = password === user.password;
        if (!isPasswordValid) return null;

        return user;
    }
}