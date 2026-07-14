import { Module } from '@nestjs/common';
import { ConversationContextService } from './conversation-context.service';

@Module({
  providers: [ConversationContextService],
  exports: [ConversationContextService],
})
export class ContextModule {}
