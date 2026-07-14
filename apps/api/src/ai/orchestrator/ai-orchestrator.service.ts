import { Inject, Injectable } from '@nestjs/common';
import { Agent, AI_AGENTS } from '../../agents/agent.interface';

@Injectable()
export class AiOrchestratorService {
  constructor(@Inject(AI_AGENTS) private readonly agents: Agent[]) {}

  async respond(message: string): Promise<string> {
    const agent = this.agents.find((candidate) => candidate.canHandle(message));

    if (agent) {
      return agent.handle(message);
    }

    return "I'm Nova. I can help you compare broadband, energy, or mobile services. What would you like to compare?";
  }
}
