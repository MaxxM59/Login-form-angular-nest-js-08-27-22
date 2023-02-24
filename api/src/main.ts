import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
   // Allowing CORS for development
   const app = await NestFactory.create(AppModule);
   app.setGlobalPrefix('api');
   // Enable validation pipe for auth module
   app.useGlobalPipes(new ValidationPipe());
   // Enable cookies
   app.use(cookieParser());
   await app.listen(3000);
}
bootstrap();
