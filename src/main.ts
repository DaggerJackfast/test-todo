import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

const bootstrap = async (): Promise<void> => {
  const PORT = process.env.PORT || 5000;
  const API_PATH = process.env.API_PATH;
  const app = await NestFactory.create(AppModule, { cors: false });
  if (API_PATH) {
    app.setGlobalPrefix(API_PATH);
  }
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
