import {NestFactory} from '@nestjs/core';
import {AppModule} from './app.module';
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";
import {ValidationPipe} from "@nestjs/common";


async function bootstrap() {
  const PORT = process.env.PORT || 5000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle("API FFGlobal")
    .setDescription("Документация по API Backend сайта FFglobal")
    .setVersion("1.0.0")
    .addServer("http://localhost/7000/api")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("/api/docs", app, document);
  app.setGlobalPrefix("/api");
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(PORT, () => {
    console.log(`Server started on PORT = ${PORT}`)
  });
}

bootstrap();
