import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {RolesModel} from "./roles.model";
import {CreateRoleDto} from "./dto/create-role.dto";

@Injectable()
export class RolesService {
  constructor(@InjectModel(RolesModel) private rolesRepository: typeof RolesModel) {
  }

  async createRole(dto: CreateRoleDto){
    return this.rolesRepository.create(dto);
  }

  async getRoleByValue(value: string) {
    const role = await this.rolesRepository.findOne({where: {value}})
    if(!role) {
      throw new HttpException(`Роли ${value} не найдено`, HttpStatus.NOT_FOUND);
    }
    return role;
  }

  async getAllRoles(){
    return this.rolesRepository.findAll();
  }
}
