import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// Prisma
import {PrismaService} from "./prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);

  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app)
}

bootstrap();
