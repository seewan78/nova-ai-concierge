# Architecture

## Current backend architecture

The current backend is a NestJS modular monolith in `apps/api`. `main.ts`
creates the application, installs global request validation, builds the OpenAPI
document, and starts the HTTP server. `AppModule` composes the feature and
infrastructure modules.

`ConfigModule` is global. It loads environment variables and fails startup
unless `DATABASE_URL` is present. `PORT` is optional but, when supplied, must
be an integer from 1 through 65535.

## Modules

| Module | Responsibility |
| --- | --- |
| `AppModule` | Composes global configuration, AI, database, chat, and health modules. |
| `DatabaseModule` | Exports the shared `PrismaService`. |
| `ChatModule` | Exposes the initial chat endpoint and its persistence service. |
| `AiModule` | Registers deterministic service-domain agents and exports the orchestrator. |
| `HealthModule` | Exposes the Terminus health endpoint. |

There is also a default root controller/service from the NestJS starter.

## Request and data flow

```text
Client
  │
  ├── POST /chat/start { message }
  │     │
  │     └── global ValidationPipe → ChatController → ChatService
  │                                      ├── PrismaService → PostgreSQL
  │                                      └── AiOrchestratorService → first matching agent
  │
  ├── POST /chat/:conversationId/message { message }
  │     │
  │     └── global ValidationPipe → ChatController → ChatService
  │                                      ├── load conversation and persist USER message
  │                                      └── orchestrate and persist ASSISTANT message
  │
  ├── GET /chat/:conversationId
  │     │
  │     └── ChatController → ChatService → load conversation and messages
  │                                            ordered by createdAt ascending
  │
  ├── GET /health → HealthController → Terminus HealthCheckService
  └── GET /api → Swagger UI
```

For `POST /chat/start`, `ChatService` currently creates a new demo `User`, a
`Conversation` in `STARTED` state, and one `Message` from `USER` in a nested
Prisma write. It then delegates the reply to `AiOrchestratorService`, which
selects the first agent whose `canHandle` method matches the message. The
current agents cover broadband, energy, and mobile; an unmatched message gets a
deterministic fallback. The assistant reply is persisted as a `Message` with
sender `ASSISTANT`. `POST /chat/:conversationId/message` continues an existing
conversation, returning `404` when it does not exist. There is no conversation
pagination, authentication, or external AI-provider call yet.

## Database models

| Model | Purpose | Relationships |
| --- | --- | --- |
| `User` | Represents the current demo user record. | Has many conversations; email is unique. |
| `Conversation` | Stores a chat session and its string state. | Belongs to one user and has many messages. |
| `Message` | Stores a sender, text content, and creation time. | Belongs to one conversation. |

All three models use UUID string IDs and a `createdAt` timestamp. The schema
and initial migration are in `apps/api/prisma`; PostgreSQL is the sole current
data store.

## Future target architecture

The initial AI Agent Framework is implemented without external AI-provider
integration. The target remains a modular NestJS backend, with clear boundaries
for:

- conversation lifecycle and message persistence;
- agent orchestration, state, and deterministic tool contracts;
- service-comparison domain data and retrieval tools;
- provider adapters added only after the framework contracts are stable;
- observability, authorization, and production deployment concerns.

Future modules should depend on explicit interfaces rather than making the chat
controller or Prisma service responsible for orchestration decisions.
