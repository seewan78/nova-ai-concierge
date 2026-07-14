import { BroadbandAgent } from '../../agents/broadband/broadband.agent';
import { EnergyAgent } from '../../agents/energy/energy.agent';
import { MobileAgent } from '../../agents/mobile/mobile.agent';
import { AiOrchestratorService } from './ai-orchestrator.service';

describe('AiOrchestratorService', () => {
  const orchestrator = new AiOrchestratorService([
    new BroadbandAgent(),
    new EnergyAgent(),
    new MobileAgent(),
  ]);

  it.each([
    [
      'I need fibre broadband',
      'I can help you compare broadband providers. What is your postcode?',
    ],
    [
      'I want to change energy supplier',
      'I can help compare energy suppliers. What is your current provider?',
    ],
    [
      'I need a SIM contract',
      'I can help compare mobile plans. Are you looking for SIM-only or a handset?',
    ],
  ])('routes "%s" to the matching agent', async (message, response) => {
    await expect(orchestrator.respond(message)).resolves.toBe(response);
  });

  it('returns a fallback response when no agent matches', async () => {
    await expect(orchestrator.respond('Can you help me?')).resolves.toBe(
      "I'm Nova. I can help you compare broadband, energy, or mobile services. What would you like to compare?",
    );
  });
});
