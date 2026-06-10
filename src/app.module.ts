import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ThrottlerModule } from '@nestjs/throttler';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import { AppService } from './app.service';
import { UploadModule } from './upload/upload.module';
import { RootController } from './root.controller';
import { MailModule } from './mail/mail.module';
import { PharmacyModule } from './pharmacy/pharmacy.module';

@Module({
  imports: [
    ThrottlerModule.forRoot({
      throttlers: [
        {
          ttl: 60, // time window in seconds
          limit: 10, // max 10 requests per 60 seconds
        },
      ],
    }),
    ConfigModule.forRoot({
      envFilePath: '.env', // specify the path to your .env file
      isGlobal: true, // make ConfigModule available globally
      load: [appConfig], // load additional configuration from app.config.ts
    }),
    UploadModule,
    PrismaModule,
    UsersModule,
    PrismaModule,
    AuthModule,
    MailModule,
    PharmacyModule,
  ],
  controllers: [RootController, AppController],
  providers: [AppService],
})
export class AppModule {}
