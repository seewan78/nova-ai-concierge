import { Injectable } from '@nestjs/common';
import { Agent } from '../agent.interface';

@Injectable()
export class EnergyAgent implements Agent {
  readonly name = 'energy';

  canHandle(message: string): boolean {
    return ['electricity', 'gas', 'energy', 'supplier'].some((keyword) =>
      message.toLowerCase().includes(keyword),
    );
  }

  async handle(_message: string): Promise<string> {
    return 'I can help compare energy suppliers. What is your current provider?';
  }
}
