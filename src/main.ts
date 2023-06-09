import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { useContainer } from 'class-validator';
import { AppModule } from './app.module';
import validationOptions from './lib/validation-options';

const bootstrap = async (): Promise<void> => {
  const PORT = process.env.PORT || 5000;
  const API_PATH = process.env.API_PATH;
  const app = await NestFactory.create(AppModule, { cors: false });
  if (API_PATH) {
    app.setGlobalPrefix(API_PATH);
  }
  useContainer(app.select(AppModule), { fallbackOnErrors: true });
  app.useGlobalPipes(new ValidationPipe(validationOptions));
  const options = new DocumentBuilder()
    .setTitle('TODO API')
    .setDescription('Swagger API docs for TODO list application')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(PORT).then(() => console.log(`Server started at http://localhost:${PORT}`));
};

bootstrap();
