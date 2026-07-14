import { Injectable } from '@nestjs/common';
import { Agent } from '../agent.interface';

@Injectable()
export class MobileAgent implements Agent {
  readonly name = 'mobile';

  canHandle(message: string): boolean {
    return ['mobile', 'phone', 'sim', 'contract'].some((keyword) =>
      message.toLowerCase().includes(keyword),
    );
  }

  async handle(_message: string): Promise<string> {
    return 'I can help compare mobile plans. Are you looking for SIM-only or a handset?';
  }
}
