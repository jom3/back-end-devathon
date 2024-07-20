import { DocumentBuilder } from '@nestjs/swagger';

//configuracion de el docs
const configsSwagger = new DocumentBuilder()
  .setTitle('Cats example')
  .setDescription('The cats API description')
  .setVersion('1.0')
  .addTag('cats')
  .build();

export { configsSwagger };
