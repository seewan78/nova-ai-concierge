export interface Agent {
  name: string;
  canHandle(message: string): boolean;
  handle(message: string): Promise<string>;
}

export const AI_AGENTS = Symbol('AI_AGENTS');
