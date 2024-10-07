import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './common/filters/all-exception-filter';
import { LoggerInterceptor } from './common/interceptors/logger.interceptor';
import { PORT } from './consts';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    app.setGlobalPrefix('api/v1', { exclude: ['/healthz'] });
    app.useGlobalPipes(
      new ValidationPipe({
        transform: true,
        whitelist: true,
        transformOptions: { enableImplicitConversion: false },
      }),
    );
    app.useGlobalFilters(new AllExceptionsFilter());
    app.useGlobalInterceptors(new LoggerInterceptor());

    const configService = app.get(ConfigService);
    const port: number = configService.get<number>(PORT) || 3010;

    await app.listen(port, () =>
      console.log(`Server running on PORT: ${port}`),
    );
  } catch (error) {
    console.error(
      `Error occured while bootstrapping the application: ${error.message}, time: ${new Date().toLocaleString()}`,
      error,
    );
    process.exit(1);
  }
}
bootstrap();
