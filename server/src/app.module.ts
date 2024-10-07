import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validateConfig } from './config/validate-config';
import { AuthModule } from './auth/auth.module';
import appConfig from './config/app.config';
import { MONGODB_NAME, MONGODB_URI } from './consts';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: validateConfig,
      validationOptions: {
        allowUnknown: true,
        abortEarly: false,
      },
      load: [appConfig],
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>(MONGODB_URI),
        dbName: configService.get<string>(MONGODB_NAME),
      }),
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
