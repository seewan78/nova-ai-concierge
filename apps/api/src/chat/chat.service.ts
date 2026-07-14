import { Injectable } from '@nestjs/common';
import { AiOrchestratorService } from '../ai/orchestrator/ai-orchestrator.service';
import { PrismaService } from '../database/prisma.service';


@Injectable()
export class ChatService {

  constructor(
    private prisma: PrismaService,
    private aiOrchestrator: AiOrchestratorService,
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


    const reply = await this.aiOrchestrator.respond(message);

    return {
      conversationId: conversation.id,
      reply,
    };
  }

}
