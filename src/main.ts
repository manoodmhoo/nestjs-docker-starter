import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.use(helmet()); // ตัวนี้จะเป็นตัวที่ป้องกันการลักษณะการทำงานของระบบ
  app.enableCors(); // ตัวนี้จะเป็นตัวที่อนุญาต cors ที่จะใช้งาน
  app.useGlobalPipes(new ValidationPipe()); // ตัวนี้จะเป็นตัวที่ตรวจสอบข้อมูลที่ส่งมา

  const dataSource = app.get(DataSource);
  try {
    if (!dataSource.isInitialized) {
      await dataSource.initialize();
    }
    console.log('✅ Database connected successfully!');
  } catch (err) {
    console.error('❌ Database connection failed:', err);
    process.exit(1);
  }

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
