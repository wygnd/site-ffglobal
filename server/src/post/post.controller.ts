import {Controller, Get, Param, Post, UseGuards} from '@nestjs/common';
import {PostService} from './post.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuard} from "../auth/jwt-auth.guard";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostModel} from "./post.model";
import {IsString} from "class-validator";
import {Roles} from "../auth/roles-auth.decorator";
import {RolesGuard} from "../auth/roles.guard";

@ApiTags('Posts')
@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {
  }

  @ApiOperation({summary: "Создание новой записи"})
  @ApiResponse({status: 200, type: PostModel})
  @UseGuards(JwtAuthGuard)
  @Post('/create')
  createPost(dto: CreatePostDto) {
    return this.postService.createPost(dto)
  }

  @ApiOperation({summary: "Получить все записи по типу"})
  @Roles("ADMIN")
  @UseGuards(RolesGuard)
  @Get('/:type')
  getPostsByType(@Param('type') type: string) {
    return this.postService.getPostsByType(type);
  }
}
