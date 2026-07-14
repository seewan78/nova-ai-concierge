# Roadmap

## Milestone: Backend foundation

Status: in progress.

Completed work:

- NestJS API scaffold with TypeScript.
- PostgreSQL 16 Docker Compose service.
- Prisma 7 schema and initial migration for users, conversations, and messages.
- Initial `POST /chat/start` persistence flow.
- Global configuration loading and startup validation for `DATABASE_URL`.
- Global request validation with class-validator and class-transformer.
- Swagger UI at `/api`.
- Terminus health endpoint at `/health`.

Remaining foundation work should focus on test coverage, operational readiness,
and repository hygiene without prematurely introducing agent or provider logic.

## Milestone: AI Agent Framework

Status: in progress.

Completed work:

- Define the `Agent` interface and an injection token for ordered agent
  registration.
- Add a deterministic `AiOrchestratorService` that selects the first matching
  agent or returns a fallback response.
- Add broadband, energy, and mobile comparison agents.
- Route `POST /chat/start` replies through the orchestrator without an external
  provider.
- Add unit coverage for matching-agent and fallback routing.

Remaining work:

- Model conversation progression and agent state explicitly.
- Establish deterministic service-comparison tool contracts.
- Extend API contracts for continuing and retrieving conversations.

## Milestone: Product capabilities

Status: planned after the framework.

- User identity and authorization.
- Service catalogue and comparison data.
- Conversation history and message pagination.
- Observability, structured logs, metrics, and production deployment.

## Milestone: External AI integration

Status: intentionally deferred.

An external model provider will be introduced only after the agent framework,
tools, state model, and test strategy are stable. This keeps provider concerns
separate from the core concierge workflow.
