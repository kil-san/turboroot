# Turborepo starter

This Turborepo starter is maintained by the Turborepo core team.

## Using this example
# Turboroot Monorepo
Run the following command:

```sh
```

## What's inside?


# Turboroot Boilerplate Monorepo

This repository is a full-stack TypeScript boilerplate using [Turborepo](https://turbo.build/) and [pnpm workspaces](https://pnpm.io/workspaces). It provides a modern, batteries-included setup for scalable web and API development, with strict conventions and shared tooling.

---

## Monorepo Structure

```
apps/
	api/    # NestJS backend (TypeScript, REST API, Docker-ready)
	web/    # Next.js frontend (React, shadcn/ui, Tailwind CSS)
packages/
	types/              # Shared TypeScript types (DTOs, interfaces)
	eslint-config/      # Shared ESLint config
	typescript-config/  # Shared TypeScript config
.github/
	copilot-instructions.md  # Project rules, conventions, and best practices
```

### Apps
- **api**: Production-ready [NestJS](https://nestjs.com/) backend. Modular service/controller structure, Jest tests, and a `Dockerfile` for containerization. See `apps/api/Dockerfile` for building and running the backend in Docker.
- **web**: [Next.js](https://nextjs.org/) frontend with [shadcn/ui](https://ui.shadcn.com/) and [Tailwind CSS](https://tailwindcss.com/). Uses [TanStack Query](https://tanstack.com/query/latest) for all data fetching.

### Packages
- **types**: All DTOs, interfaces, and types shared between frontend and backend. Import as:
	```ts
	import { ProfileDto } from '@repo/types/dto'
	```
- **eslint-config**: Centralized ESLint rules for consistent linting.
- **typescript-config**: Shared TypeScript configs for all apps/packages.

---

## Boilerplate Features

- **TypeScript everywhere**: No JavaScript files.
- **Strict folder conventions**: See `.github/copilot-instructions.md` for all rules and patterns.
- **pnpm + Turborepo**: Fast, cacheable builds and dependency management.
- **Ready for Docker**: `apps/api/Dockerfile` for backend containerization.
- **Modern UI**: shadcn/ui, Tailwind CSS, and React in the frontend.
- **Shared types**: All contracts in `packages/types` for type-safe API and UI.
- **Unit tests**: Jest for backend services/controllers.

---

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18+ recommended)
- [pnpm](https://pnpm.io/)


### Setup environment variables
Copy the example environment file and edit as needed:
```sh
cp .env.example .env
```

### Install dependencies
```sh
pnpm install
```

### Run all apps (dev mode)
```sh
pnpm turbo run dev
```
- Frontend: [http://localhost:3000](http://localhost:3000)
- Backend: [http://localhost:4000](http://localhost:3001)

---

## Conventions & Documentation

- **All project rules, folder structure, and coding standards are documented in** `.github/copilot-instructions.md`. **Read this file before contributing.**
- **API Dockerfile**: `apps/api/Dockerfile` provides a production-ready container build for the backend.
- **Adding new apps/packages**: Place new apps in `apps/`, new packages in `packages/`, and document new patterns in `.github/copilot-instructions.md`.

---

## Scripts

- `pnpm dev` — Start all apps in development mode
- `pnpm build` — Build all apps/packages
- `pnpm lint` — Lint all code
- `pnpm test` — Run all tests

---

## References

- [Turborepo Docs](https://turbo.build/docs)
- [pnpm Workspaces](https://pnpm.io/workspaces)
- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [shadcn/ui](https://ui.shadcn.com/)
- [TanStack Query](https://tanstack.com/query/latest)

---

## License

MIT
