import { Injectable } from '@nestjs/common';
import { Agent } from '../agent.interface';

@Injectable()
export class BroadbandAgent implements Agent {
  readonly name = 'broadband';

  canHandle(message: string): boolean {
    return ['broadband', 'internet', 'wifi', 'fibre'].some((keyword) =>
      message.toLowerCase().includes(keyword),
    );
  }

  async handle(_message: string): Promise<string> {
    return 'I can help you compare broadband providers. What is your postcode?';
  }
}
