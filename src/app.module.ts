import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 10 }]), // ทำ Rate Limit ของการเข้าถึงข้อมูล
    ConfigModule.forRoot({ isGlobal: true }), // ใส่เพื่อจะใช้งาน .env ได้ทั้งหมด
    TypeOrmModule.forRoot({ // ตัวนี้จะเป็นตัวที่เชื่อมกับฐานข้อมูล
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT ? +process.env.DB_PORT : 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
