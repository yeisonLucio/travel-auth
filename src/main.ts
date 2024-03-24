import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log("PORT:::::",process.env.DB_USER);
  
  await app.listen(3000);
}
bootstrap();
