import { Module } from '@nestjs/common';
import { Agent, AI_AGENTS } from '../agents/agent.interface';
import { BroadbandAgent } from '../agents/broadband/broadband.agent';
import { EnergyAgent } from '../agents/energy/energy.agent';
import { MobileAgent } from '../agents/mobile/mobile.agent';
import { AiOrchestratorService } from './orchestrator/ai-orchestrator.service';

@Module({
  providers: [
    BroadbandAgent,
    EnergyAgent,
    MobileAgent,
    {
      provide: AI_AGENTS,
      useFactory: (
        broadbandAgent: BroadbandAgent,
        energyAgent: EnergyAgent,
        mobileAgent: MobileAgent,
      ): Agent[] => [broadbandAgent, energyAgent, mobileAgent],
      inject: [BroadbandAgent, EnergyAgent, MobileAgent],
    },
    AiOrchestratorService,
  ],
  exports: [AiOrchestratorService],
})
export class AiModule {}
