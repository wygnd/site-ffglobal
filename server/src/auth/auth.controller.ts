import {Body, Controller, Post} from '@nestjs/common';
import {AuthService} from './auth.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {CreateUserDto} from "../users/dto/create-user.dto";
import {UserModel} from "../users/user.model";

@ApiTags('Authorization')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @ApiOperation({summary: "Авторизация пользователя"})
    @ApiResponse({status: 200, type: UserModel})
    @Post('/signin')
    async signIn(@Body() user: CreateUserDto) {
        return this.authService.signIn(user);
    }

    @ApiOperation({summary: "Регистрация пользователя"})
    @ApiResponse({status: 200, type: UserModel})
    @Post('/signup')
    async singUp(@Body() user: CreateUserDto) {
        return this.authService.signUp(user);
    }
}
