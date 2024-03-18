import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {PostModel} from "../post/post.model";
import {PostStatusModel} from "../post/post-status.model";

@Table({tableName: "status", timestamps: false, updatedAt: false, createdAt: false})
export class StatusModel extends Model<StatusModel> {

  @ApiProperty({example: 1, description: "Уникальный идентификатор статуса"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  status_id: number;

  @ApiProperty({example: "Publish", description: "Значение статуса"})
  @Column({type: DataType.STRING, unique: true, allowNull: false})
  value: string;

  @ApiProperty({example: "Опубликованно", description: "Описание статуса"})
  @Column({type: DataType.STRING, allowNull: false})
  description: string;

  @BelongsToMany(() => PostModel, () => PostStatusModel)
  status: PostModel[]
}