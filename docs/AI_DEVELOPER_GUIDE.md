# AI Developer Guide

## Working principles

Codex and other contributors should treat the existing code and Prisma schema
as the source of truth. Keep changes focused on the requested scope, preserve
working-tree changes that are unrelated to the task, and verify each change at
the application level.

Before editing:

1. Read the relevant module, DTO, tests, Prisma schema, and configuration.
2. Check Git status. The API currently has its own nested Git metadata, so
   check both the project root and `apps/api` when reviewing repository state.
3. State the proposed implementation plan before making non-trivial changes.

Do not modify `apps/api/prisma/schema.prisma` or its migrations unless the task
explicitly calls for a data-model change. Do not introduce authentication or an
external AI provider while the project is building the AI Agent Framework.

## Coding conventions

- Use TypeScript and NestJS modules, controllers, services, and DTOs.
- Keep controllers thin: receive HTTP input and delegate application work to a
  service.
- Keep database access behind `PrismaService` and use Prisma migrations for
  schema changes.
- Use DTO decorators for request validation and Swagger descriptions.
- Rely on the global `ValidationPipe`; do not bypass validation for new routes.
- Read runtime configuration through the global configuration setup; required
  environment variables must be validated during startup.
- Add focused unit or integration tests alongside behavioural changes.
- Do not run `npm run lint` as a read-only check: its current script includes
  `--fix` and may change files. Use it only when formatting changes are intended.

## Local development

Run these commands from `apps/api`:

```bash
npm install
npm run start:dev
```

The API listens on port `3000` by default. It requires `DATABASE_URL`; local
PostgreSQL can be started from the repository root:

```bash
docker compose -f infrastructure/docker/docker-compose.yml up -d
```

Useful endpoints while developing:

- `http://localhost:3000/api` — Swagger UI
- `http://localhost:3000/health` — health response

## Verification commands

Run these from `apps/api`:

```bash
npm run build
npm test
npm run test:e2e
```

The E2E suite imports the full application, so it requires a reachable database
configured through `DATABASE_URL`. Generate Prisma client output after an
intentional schema change:

```bash
npx prisma generate
```
