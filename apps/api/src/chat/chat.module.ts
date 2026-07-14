import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatService } from './chat.service';
import { AiModule } from '../ai/ai.module';
import { DatabaseModule } from '../database/database.module';


@Module({
  imports: [
    AiModule,
    DatabaseModule
  ],

  controllers: [
    ChatController
  ],

  providers: [
    ChatService
  ],
})
export class ChatModule {}
