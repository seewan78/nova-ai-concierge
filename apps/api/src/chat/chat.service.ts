import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';


@Injectable()
export class ChatService {

  constructor(
    private prisma: PrismaService
  ) {}


  async startConversation(message: string) {

    const conversation =
      await this.prisma.conversation.create({
        data: {
          state: 'STARTED',

          messages: {
            create: {
              sender: 'USER',
              content: message
            }
          },

          user: {
            create: {
              email: `user-${Date.now()}@nova.local`,
              name: 'Demo User'
            }
          }
        }
      });


    return {
      conversationId: conversation.id,

      reply:
        "Hello, I'm Nova. I can help you compare services. What would you like to compare?"
    };
  }

}