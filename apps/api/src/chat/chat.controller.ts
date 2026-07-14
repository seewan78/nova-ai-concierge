import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiTags } from '@nestjs/swagger';
import { ChatService } from './chat.service';
import { SendMessageDto } from './dto/send-message.dto';
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

  @Post(':conversationId/message')
  @ApiOperation({ summary: 'Send a message in an existing conversation' })
  @ApiParam({ name: 'conversationId', description: 'The conversation UUID' })
  async sendMessage(
    @Param('conversationId') conversationId: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.chatService.continueConversation(conversationId, dto.message);
  }

  @Get(':conversationId')
  @ApiOperation({ summary: 'Get an existing conversation and its messages' })
  @ApiParam({ name: 'conversationId', description: 'The conversation UUID' })
  async getConversation(@Param('conversationId') conversationId: string) {
    return this.chatService.getConversation(conversationId);
  }
}
