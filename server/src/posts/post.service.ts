import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {PostModel} from "./post.model";
import {CreatePostDto} from "./dto/create-post.dto";
import {StatusService} from "../status/status.service";
import {JwtService} from "@nestjs/jwt";
import {ChangePostStatusDto} from "./dto/change-post-status.dto";
import {ChangePostDto} from "./dto/change-post.dto";
import {UsersService} from "../users/users.service";
import {GetPostsDto} from "./dto/get-posts.dto";
import {Op} from "sequelize";
import {StatusModel} from "../status/status.model";
import {GetPostDto} from "./dto/get-post.dto";

@Injectable()
export class PostService {
  constructor(@InjectModel(PostModel) private postRepository: typeof PostModel,
              private statusService: StatusService,
              private jwtService: JwtService,
              private userService: UsersService) {
  }

  async createPost(postDto: CreatePostDto, token: string) {
    const user = this.userService.getUserByToken(token);
    const post = await this.postRepository.create({...postDto, author_id: user.user_id});
    if (postDto.type === "setting") {
      const status = await this.statusService.getStatusByValue("Publish");
      await post.$set("status", status.status_id);
      post.status = status;
      return post;
    }
    const status = await this.statusService.getStatusByValue("Draft");
    await post.$set("status", status.status_id);
    post.status = status;
    return post;
  }

  async getPostsByType(type: string) {
    return this.postRepository.findAll({where: {type}})
  }

  async removePostById(post_id: string) {
    const post = await this.postRepository.findByPk(post_id, {include: {all: true}});
    if (!post) {
      throw new HttpException(`Такой записи не существует`, HttpStatus.NOT_FOUND);
    }
    await post.$remove("status", post.status.status_id)
    await post.destroy();
    return {message: "Запись успешно удалена", status: 200};
  }

  async changePostStatus(dto: ChangePostStatusDto) {
    const post = await this.postRepository.findByPk(dto.post_id, {include: {all: true}});
    const status = await this.statusService.getStatusById(dto.status_id);

    if (!post) {
      throw new HttpException(`Такой записи не существует`, HttpStatus.NOT_FOUND);
    }

    if (!status) {
      throw new HttpException(`Такого статуса не существует`, HttpStatus.NOT_FOUND);
    }

    await post.$set('status', status.status_id);
    return this.postRepository.findByPk(dto.post_id, {include: {all: true}});
  }

  async changePostData(dto: ChangePostDto, token: string) {
    const user = this.userService.getUserByToken(token);
    const post = await this.postRepository.findByPk(dto.post_id, {include: {all: true}});

    if (!post) {
      throw new HttpException(`Такой записи не существует`, HttpStatus.NOT_FOUND);
    }
    await post.update({...dto, author_id: user.user_id,})
    return post;
  }

  async clonePost(post_id: number, token: string) {
    const post = await this.postRepository.findByPk(post_id, {attributes: {exclude: ['post_id', 'author_id', 'createdAt']}});
    if (!post) {
      throw new HttpException(`Такой записи не существует`, HttpStatus.NOT_FOUND);
    }
    post.name = post.name + ` copy`
    return await this.createPost({
      title: post.title,
      name: post.name,
      content: post.content,
      type: post.type,
      menu_order: post.menu_order
    }, token);
  }

  async getPostsWithArgs({post_type, order, orderBy, number_posts, paged}: GetPostsDto) {
    try {
      const offset: number = paged * number_posts - number_posts;

      return await this.postRepository.findAll({
        where: {
          type: post_type,
        },
        include: [
          {
            model: StatusModel,
          }
        ],
        order: [
          [orderBy || "post_id", order || "ASC"]
        ],
        limit: number_posts,
        offset: offset
      })
    } catch (e) {
      throw new HttpException(e, HttpStatus.FORBIDDEN);
    }
  }

  async getPost(args: GetPostDto) {
    const post = await this.postRepository.findByPk(args.post_id, {
      attributes: args.attributes
    });

    if (!post) {
      throw new HttpException('Записи не найдено', HttpStatus.NOT_FOUND);
    }

    return post;
  }
}
