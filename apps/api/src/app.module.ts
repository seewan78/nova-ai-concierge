import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AiModule } from './ai/ai.module';
import { DatabaseModule } from './database/database.module';
import { ChatModule } from './chat/chat.module';
import { validateEnvironment } from './config/env.validation';
import { HealthModule } from './health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: validateEnvironment,
    }),

    DatabaseModule,
    AiModule,
    ChatModule,
    HealthModule,
  ],
})
export class AppModule {}
