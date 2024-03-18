import {Module} from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import {MongooseModule} from "@nestjs/mongoose";
import {UsersModule} from './users/users.module';
import {RolesModule} from './roles/roles.module';
import {UserModel} from "./users/user.model";
import {RolesModel} from "./roles/roles.model";
import {UserRolesModel} from "./roles/user-roles.model";
import { AuthModule } from './auth/auth.module';
import { PostModule } from './post/post.module';
import {PostModel} from "./post/post.model";
import { StatusModule } from './status/status.module';
import {StatusModel} from "./status/status.model";
import {PostStatusModel} from "./post/post-status.model";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.${process.env.NODE_ENV}.env`
    }),
    SequelizeModule.forRoot({
      dialect: "mysql",
      host: process.env.DB_HOST_MYSQL,
      port: +process.env.DB_PORT_MYSQL,
      username: process.env.DB_USERNAME_MYSQL,
      password: process.env.DB_PASSWORD_MYSQL,
      database: process.env.DB_DATABASE_MYSQL,
      models: [UserModel, RolesModel, UserRolesModel, PostModel, StatusModel, PostStatusModel],
      synchronize: true,
      autoLoadModels: true,
    }),
    // MongooseModule.forRoot(process.env.DB_MONGO),
    UsersModule,
    RolesModule,
    AuthModule,
    PostModule,
    StatusModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
}
