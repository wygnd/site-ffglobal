import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {PostModel} from "./post.model";
import {CreatePostDto} from "./dto/create-post.dto";

@Injectable()
export class PostService {
  constructor(@InjectModel(PostModel) private postRepository: typeof PostModel) {
  }

  async createPost(postDto: CreatePostDto) {
    return this.postRepository.create(postDto)
  }

  async getPostsByType(type: string) {
    return this.postRepository.findAll({where: {type}})
  }
}
