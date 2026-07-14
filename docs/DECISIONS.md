# Architectural Decisions

## ADR-001: NestJS backend

**Status:** Accepted

Nova uses NestJS 11 for the backend. Its modules, dependency injection,
controllers, and services provide a structured TypeScript foundation for the
current API and future agent-oriented modules.

## ADR-002: PostgreSQL with Prisma

**Status:** Accepted

Nova uses PostgreSQL as its relational data store and Prisma 7 as the ORM and
migration system. The current schema models users, conversations, and messages.
PostgreSQL runs locally through Docker Compose, while `PrismaService` uses the
Prisma PostgreSQL driver adapter in the API.

## ADR-003: Single project repository structure

**Status:** Accepted

The project is organized as one repository containing applications,
infrastructure, packages, mock data, and documentation. This supports shared
documentation and coordinated changes as the system grows. The current
`apps/api/.git` metadata is a repository-boundary inconsistency to normalize;
it does not change the intended single-project structure.

## ADR-004: Agent framework before external AI integration

**Status:** Accepted

Nova will establish its AI Agent Framework before integrating an external AI
provider. Agent responsibilities, state, tool interfaces, and orchestration
tests should be provider-independent first. External model access is therefore
deferred and must not be added as incidental implementation work.

## ADR-005: Foundation concerns are global

**Status:** Accepted

Configuration loading, environment validation, request validation, OpenAPI
documentation, and liveness health checks are application-wide concerns. They
are configured at bootstrap or module-composition level so feature modules can
focus on their domain responsibilities.
