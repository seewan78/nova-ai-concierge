# Nova AI Concierge: Project Context

## Purpose

Nova AI Concierge is being built as a concierge-style service that will help
users compare services and make informed choices. The current API presents the
first chat entry point and routes service-comparison requests to internal,
provider-free agents. External AI provider integration is deliberately not
implemented yet.

## Current capabilities

The API currently provides:

- `GET /` — the default NestJS hello response.
- `POST /chat/start` — creates a demo user, a `STARTED` conversation, and its
  first user message; it returns the conversation ID and a deterministic reply
  from the matching broadband, energy, or mobile agent. Both messages are
  persisted.
- `POST /chat/:conversationId/message` — stores a user message and its
  deterministic assistant reply in an existing conversation.
- `GET /chat/:conversationId` — returns an existing conversation with its
  messages ordered by creation time.
- `GET /health` — a NestJS Terminus liveness health check.
- `GET /api` — Swagger UI for the HTTP API.

The application validates `DATABASE_URL` at startup. Request validation is
global: payloads are transformed, unknown properties are rejected, and the
chat-start `message` property must be a string.

## Technology stack

- Node.js and TypeScript (ES2023)
- NestJS 11 with the Express platform
- PostgreSQL 16
- Prisma 7 with the PostgreSQL driver adapter
- Docker Compose for local PostgreSQL
- Swagger / OpenAPI via `@nestjs/swagger`
- Health checks via `@nestjs/terminus`
- Jest and Supertest for tests
- ESLint and Prettier for code quality and formatting

## Repository structure

```text
nova-ai-concierge/
├── apps/
│   └── api/                  # NestJS API application
│       ├── prisma/           # Prisma schema and migrations
│       ├── src/              # Application modules and bootstrap code
│       └── test/             # E2E test configuration and tests
├── docs/                     # Project and engineering documentation
├── infrastructure/docker/    # Local PostgreSQL Compose configuration
├── mock-data/                # Reserved for future fixtures
└── packages/                 # Reserved for shared packages
```

The intended organization is one project repository containing applications,
infrastructure, and documentation. At present, `apps/api` also contains nested
Git metadata; contributors should account for that boundary until it is
normalized.
