import { NotFoundException } from '@nestjs/common';
import { AiOrchestratorService } from '../ai/orchestrator/ai-orchestrator.service';
import { PrismaService } from '../database/prisma.service';
import { ChatService } from './chat.service';

describe('ChatService', () => {
  const conversationId = 'conversation-1';
  const reply = 'I can help compare mobile plans.';
  let prisma: {
    conversation: {
      create: jest.Mock;
      findUnique: jest.Mock;
    };
    message: {
      create: jest.Mock;
    };
  };
  let aiOrchestrator: {
    respond: jest.Mock;
  };
  let service: ChatService;

  beforeEach(() => {
    prisma = {
      conversation: {
        create: jest.fn(),
        findUnique: jest.fn(),
      },
      message: {
        create: jest.fn(),
      },
    };
    aiOrchestrator = {
      respond: jest.fn(),
    };
    service = new ChatService(
      prisma as unknown as PrismaService,
      aiOrchestrator as unknown as AiOrchestratorService,
    );
  });

  it('persists the assistant reply when starting a conversation', async () => {
    prisma.conversation.create.mockResolvedValue({ id: conversationId });
    aiOrchestrator.respond.mockResolvedValue(reply);

    await expect(service.startConversation('I need a mobile plan')).resolves.toEqual({
      conversationId,
      reply,
    });

    expect(prisma.message.create).toHaveBeenCalledWith({
      data: {
        sender: 'ASSISTANT',
        content: reply,
        conversationId,
      },
    });
  });

  it('continues an existing conversation and persists both messages', async () => {
    prisma.conversation.findUnique.mockResolvedValue({ id: conversationId });
    aiOrchestrator.respond.mockResolvedValue(reply);

    await expect(
      service.continueConversation(conversationId, 'I need a mobile plan'),
    ).resolves.toEqual({ conversationId, reply });

    expect(prisma.message.create).toHaveBeenNthCalledWith(1, {
      data: {
        sender: 'USER',
        content: 'I need a mobile plan',
        conversationId,
      },
    });
    expect(aiOrchestrator.respond).toHaveBeenCalledWith('I need a mobile plan');
    expect(prisma.message.create).toHaveBeenNthCalledWith(2, {
      data: {
        sender: 'ASSISTANT',
        content: reply,
        conversationId,
      },
    });
  });

  it('throws when the conversation does not exist', async () => {
    prisma.conversation.findUnique.mockResolvedValue(null);

    await expect(
      service.continueConversation(conversationId, 'I need a mobile plan'),
    ).rejects.toBeInstanceOf(NotFoundException);

    expect(prisma.message.create).not.toHaveBeenCalled();
    expect(aiOrchestrator.respond).not.toHaveBeenCalled();
  });

  it('returns an existing conversation with messages in ascending creation order', async () => {
    const conversation = {
      id: conversationId,
      state: 'STARTED',
      messages: [
        { id: 'message-1', sender: 'USER', content: 'Hello' },
        { id: 'message-2', sender: 'ASSISTANT', content: reply },
      ],
    };
    prisma.conversation.findUnique.mockResolvedValue(conversation);

    await expect(service.getConversation(conversationId)).resolves.toEqual(
      conversation,
    );

    expect(prisma.conversation.findUnique).toHaveBeenCalledWith({
      where: { id: conversationId },
      include: {
        messages: {
          orderBy: {
            createdAt: 'asc',
          },
        },
      },
    });
  });

  it('throws when retrieving an unknown conversation', async () => {
    prisma.conversation.findUnique.mockResolvedValue(null);

    await expect(service.getConversation(conversationId)).rejects.toBeInstanceOf(
      NotFoundException,
    );
  });
});
