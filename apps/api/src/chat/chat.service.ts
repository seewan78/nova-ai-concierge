import { Injectable, NotFoundException } from '@nestjs/common';
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

    await this.prisma.message.create({
      data: {
        sender: 'ASSISTANT',
        content: reply,
        conversationId: conversation.id,
      },
    });

    return {
      conversationId: conversation.id,
      reply,
    };
  }

  async continueConversation(conversationId: string, message: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation ${conversationId} was not found.`);
    }

    await this.prisma.message.create({
      data: {
        sender: 'USER',
        content: message,
        conversationId: conversation.id,
      },
    });

    const reply = await this.aiOrchestrator.respond(message);

    await this.prisma.message.create({
      data: {
        sender: 'ASSISTANT',
        content: reply,
        conversationId: conversation.id,
      },
    });

    return {
      conversationId: conversation.id,
      reply,
    };
  }

  async getConversation(conversationId: string) {
    const conversation = await this.prisma.conversation.findUnique({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });

    if (!conversation) {
      throw new NotFoundException(`Conversation ${conversationId} was not found.`);
    }

    return conversation;
  }
}
