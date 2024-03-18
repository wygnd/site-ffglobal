import {Column, DataType, ForeignKey, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {PostModel} from "./post.model";
import {StatusModel} from "../status/status.model";

@Table({tableName: "post_status", timestamps: false, createdAt: false, updatedAt: false})
export class PostStatusModel extends  Model<PostStatusModel> {
  @ApiProperty({example: 1, description: "Уникальный идентификатор записи"})
  @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
  object_id: number;

  @ApiProperty({example: 1, description: "Уникальный идентификатор поста"})
  @ForeignKey(() => PostModel)
  @Column({type: DataType.INTEGER, allowNull: false})
  post_id: number;

  @ApiProperty({example: 1, description: "Уникальный идентификатор статуса"})
  @ForeignKey(() => StatusModel)
  @Column({type: DataType.INTEGER, allowNull: false})
  status_id: number;
}