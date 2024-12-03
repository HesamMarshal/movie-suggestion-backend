import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerConfigInit } from './config/swagger.config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Enable CORS
  app.enableCors({
    origin: [
      'http://localhost:3000', // Development frontend
      'https://frontend.whattowatch.ir', // Production frontend
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE', // Allowed HTTP methods
    credentials: true, // Allow credentials (if needed)
  });

  // const isDevelopment = process.env.NodeEnv === 'development';
  // app.enableCors({
  //   origin: isDevelopment
  //     ? 'http://localhost:3000'
  //     : 'https://frontend.whattowatch.ir',
  // });

  // Configure Swagger
  SwaggerConfigInit(app);

  // Static folder
  app.useStaticAssets('public');

  // Enable global validation pipe
  // app.useGlobalPipes(new ValidationPipe());
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strip unvalidated properties
      forbidNonWhitelisted: true,
    }),
  );

  // Activate Cookie Parser
  app.use(cookieParser(process.env.COOKIE_SECRET));

  // Start Server
  const PORT = process.env.PORT;

  await app.listen(PORT, () => {
    console.log(`Root:    http://localhost:${PORT}`);
    console.log(`Swagger: http://localhost:${PORT}/swagger`);
  });
}
bootstrap();
