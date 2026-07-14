import { Inject, Injectable } from '@nestjs/common';
import { Agent, AI_AGENTS } from '../../agents/agent.interface';
import { ConversationContext } from '../../context/conversation-context.service';

@Injectable()
export class AiOrchestratorService {
  constructor(@Inject(AI_AGENTS) private readonly agents: Agent[]) {}

  async respond(
    message: string,
    context?: ConversationContext,
  ): Promise<string> {
    const agent =
      this.agents.find((candidate) => candidate.canHandle(message)) ??
      this.findContextAgent(context);

    if (agent) {
      return agent.handle(message);
    }

    return "I'm Nova. I can help you compare broadband, energy, or mobile services. What would you like to compare?";
  }

  private findContextAgent(context?: ConversationContext): Agent | undefined {
    const intent = context?.intent;

    if (!intent) {
      return undefined;
    }

    return this.agents.find(
      (candidate) => candidate.name === intent.toLowerCase(),
    );
  }
}
