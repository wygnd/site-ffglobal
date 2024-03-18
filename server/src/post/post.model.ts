import {BelongsTo, BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {StatusModel} from "../status/status.model";
import {PostStatusModel} from "./post-status.model";

@Table({tableName: "posts", createdAt: false, timestamps: false, updatedAt: false})
export class PostModel extends Model<PostModel> {
    @ApiProperty({example: 1, description: "Уникальный идентификатор поста"})
    @Column({type: DataType.INTEGER, unique: true, primaryKey: true, autoIncrement: true})
    post_id: number;

    @ApiProperty({example: "main-page", description: "Заголовок записи"})
    @Column({type: DataType.STRING, allowNull: false})
    title: string;

    @ApiProperty({example: "Это первая запись...", description: "Контент/описание записи"})
    @Column({type: DataType.TEXT('long')})
    content: string;

    @ApiProperty({example: "Гланвая страница", description: "Название записи"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: 0, description: "Позиция в меню"})
    @Column({type: DataType.INTEGER, allowNull: false, defaultValue: 0})
    menu_order: number;

    @ApiProperty({example: "page", description: "Тип записи (страница, блок, меню и тд)"})
    @Column({type: DataType.STRING, allowNull: false})
    type: string;

    @BelongsToMany(() => StatusModel, () => PostStatusModel)
    status: StatusModel[]
}