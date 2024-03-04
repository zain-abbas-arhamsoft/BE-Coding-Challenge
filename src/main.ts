import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

import { Seeder } from './seeder';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const seeder = app.get(Seeder);
  await seeder.seed();

  const config = new DocumentBuilder()
    .setTitle('Backend coding challenge Api ')
    .setDescription('The Backend coding challenge API description')
    .setVersion('1.0')
    .addTag('user')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
