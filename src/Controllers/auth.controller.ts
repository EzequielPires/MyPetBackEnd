import { Controller, Post, Req, UseFilters, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { HttpExceptionFilter } from "src/Filters/http-exception.filter";
import { AuthService } from "src/Services/auth.service";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(AuthGuard('local'))
    @Post('login')
    @UseFilters(new HttpExceptionFilter())
    async login(@Req() req: any) {
        return this.authService.login(req.user);
    }
}