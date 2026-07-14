import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { StartChatDto } from './dto/start-chat.dto';

@ApiTags('Chat')
@Controller('chat')
export class ChatController {
  constructor(private chatService: ChatService) {}

  @Post('start')
  @ApiOperation({ summary: 'Start a chat conversation' })
  async start(@Body() dto: StartChatDto) {
    return this.chatService.startConversation(dto.message);
  }
}
