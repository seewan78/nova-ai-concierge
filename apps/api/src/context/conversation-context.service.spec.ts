import { ConversationContextService } from './conversation-context.service';

describe('ConversationContextService', () => {
  const service = new ConversationContextService();

  it('detects an intent from the current message', () => {
    expect(service.buildContext([], 'I need fibre broadband')).toEqual({
      intent: 'BROADBAND',
      collectedData: {},
    });
  });

  it('uses prior messages for intent and postcode context', () => {
    expect(
      service.buildContext(
        [
          { content: 'I want to compare broadband providers.' },
          { content: 'My postcode is NG5 1AA.' },
        ],
        'Yes, please continue.',
      ),
    ).toEqual({
      intent: 'BROADBAND',
      collectedData: {
        postcode: 'NG5 1AA',
      },
    });
  });

  it('returns no intent or collected data when no rules match', () => {
    expect(service.buildContext([], 'Can you help me?')).toEqual({
      intent: null,
      collectedData: {},
    });
  });
});
