import {BelongsToMany, Column, DataType, Model, Table} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {RolesModel} from "../roles/roles.model";
import {UserRolesModel} from "../roles/user-roles.model";

@Table({tableName: "users", createdAt: false, updatedAt: false, timestamps: false})
export class UserModel extends Model<UserModel> {
    @ApiProperty({example: 1, description: "Уникальный идентификатор пользователя"})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    user_id: number;

    @ApiProperty({example: "Денис", description: "Имя пользователя"})
    @Column({type: DataType.STRING, allowNull: false})
    name: string;

    @ApiProperty({example: "example@gmail.ru", description: "Email пользователя"})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: "password", description: "Пароль пользователя"})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: "1", description: "Аватар пользователя", default: "null"})
    @Column({type: DataType.STRING})
    avatar: string;

    @BelongsToMany(() => RolesModel, () => UserRolesModel)
    roles: RolesModel[];
}