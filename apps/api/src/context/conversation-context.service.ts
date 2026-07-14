import { Injectable } from '@nestjs/common';

export type ConversationIntent = 'BROADBAND' | 'ENERGY' | 'MOBILE';

export interface ConversationMessage {
  content: string;
}

export interface ConversationContext {
  intent: ConversationIntent | null;
  collectedData: {
    postcode?: string;
  };
}

const INTENT_KEYWORDS: Record<ConversationIntent, string[]> = {
  BROADBAND: ['broadband', 'internet', 'wifi', 'fibre'],
  ENERGY: ['energy', 'electricity', 'gas', 'supplier'],
  MOBILE: ['mobile', 'phone', 'sim', 'contract'],
};

const UK_POSTCODE_PATTERN =
  /\b(?:GIR\s?0AA|[A-Z]{1,2}\d{1,2}[A-Z]?\s?\d[A-Z]{2})\b/i;

@Injectable()
export class ConversationContextService {
  buildContext(
    messages: ConversationMessage[],
    currentMessage: string,
  ): ConversationContext {
    const messageTexts = [...messages.map((message) => message.content), currentMessage];

    return {
      intent: this.findIntent(messageTexts),
      collectedData: this.findCollectedData(messageTexts),
    };
  }

  private findIntent(messages: string[]): ConversationIntent | null {
    for (const message of [...messages].reverse()) {
      const normalizedMessage = message.toLowerCase();

      for (const [intent, keywords] of Object.entries(INTENT_KEYWORDS)) {
        if (keywords.some((keyword) => normalizedMessage.includes(keyword))) {
          return intent as ConversationIntent;
        }
      }
    }

    return null;
  }

  private findCollectedData(messages: string[]): ConversationContext['collectedData'] {
    for (const message of [...messages].reverse()) {
      const postcode = message.match(UK_POSTCODE_PATTERN)?.[0];

      if (postcode) {
        return {
          postcode: postcode.replace(/\s+/g, ' ').trim().toUpperCase(),
        };
      }
    }

    return {};
  }
}
