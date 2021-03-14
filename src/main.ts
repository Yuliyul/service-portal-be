import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const config = app.get<ConfigService>(ConfigService);

  // options
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  // swagger
  const swaggerOptions = new DocumentBuilder()
    .setTitle('AlehisHR Public API')
    .setDescription('AlehisHR Public API')
    .build();
  const swaggerDoc = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(config.get('apiDocPath'), app, swaggerDoc);

  await app.listen(config.get('port'));
}
bootstrap();
