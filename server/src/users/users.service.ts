import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserModel} from "./user.model";
import {CreateUserDto} from "./dto/create-user.dto";
import {RolesService} from "../roles/roles.service";

@Injectable()
export class UsersService {
  constructor(@InjectModel(UserModel) private userRepository: typeof UserModel,
              private rolesServices: RolesService) {
  }

  async createUser(new_user: CreateUserDto) {
    const candidate = await this.userRepository.findOne({where: {email: new_user.email}});
    if (candidate) {
      throw new HttpException(`Пользователь с такой почтой (${new_user.email}) уже существует`, HttpStatus.CONFLICT);
    }

    const user = await this.userRepository.create(new_user);
    const userRole = await this.rolesServices.getRoleByValue("ADMIN");
    await user.$set("roles", [userRole.role_id]);
    user.roles = [userRole];
    return user;
  }

  async getAllUsers() {
    return this.userRepository.findAll();
  }

  async getUserByEmail(email: string){
    return this.userRepository.findOne({where: {email}})
  }
}
