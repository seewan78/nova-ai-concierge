# Roadmap

## Milestone: Backend foundation

Status: in progress.

Completed work:

- NestJS API scaffold with TypeScript.
- PostgreSQL 16 Docker Compose service.
- Prisma 7 schema and initial migration for users, conversations, and messages.
- Initial `POST /chat/start` persistence flow and fixed concierge greeting.
- Global configuration loading and startup validation for `DATABASE_URL`.
- Global request validation with class-validator and class-transformer.
- Swagger UI at `/api`.
- Terminus health endpoint at `/health`.

Remaining foundation work should focus on test coverage, operational readiness,
and repository hygiene without prematurely introducing agent or provider logic.

## Milestone: AI Agent Framework

Status: next.

Planned outcomes:

- Define agent, tool, and orchestration interfaces.
- Model conversation progression and agent state explicitly.
- Establish deterministic service-comparison tool contracts.
- Add testable orchestration flows independent of an external model provider.
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
