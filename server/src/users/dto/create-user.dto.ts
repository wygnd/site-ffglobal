import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNotEmpty, IsString} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: "Денис", description: "Имя пользователя"})
    @IsNotEmpty()
    @IsString()
    readonly name: string;

    @ApiProperty({example: "example@gmail.com", description: "Адресс электронной почты"})
    @IsEmail()
    readonly email: string;

    @ApiProperty({example: "password", description: "Пароль пользователя"})
    @IsNotEmpty()
    @IsString()
    readonly password: string;
}