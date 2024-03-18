import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {StatusModel} from "./status.model";
import {CreateStatusDto} from "./dto/create-status.dto";

@Injectable()
export class StatusService {
  constructor(@InjectModel(StatusModel) private statusRepository: typeof StatusModel) {
  }


  async getAll() {
    return this.statusRepository.findAll({include: {all: true}})
  }

  async createStatus(dto: CreateStatusDto) {
    const candidate = await this.statusRepository.findOne({where: {value: dto.value}})
    if (candidate) {
      throw new HttpException(`Такой статус (${dto.value}) уже существует`, HttpStatus.BAD_REQUEST);
    }
    return this.statusRepository.create(dto);
  }

  async getStatusByValue(value: string) {
    return this.statusRepository.findOne({where: {value}});
  }
}
