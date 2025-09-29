# GitHub Copilot Instructions

## Project Structure

This is a monorepo managed with [Turborepo](https://turbo.build/), using [pnpm workspaces](https://pnpm.io/workspaces). The main folders are:

- `apps/web`: Frontend application (Next.js, React, shadcn/ui, Tailwind CSS)
- `apps/api`: Backend application (NestJS, TypeScript)
- `packages/types`: Shared TypeScript types (DTOs, interfaces) for use across frontend and backend
- `packages/eslint-config`, `packages/typescript-config`: Shared configuration packages

## Coding Rules

### 1. Frontend Code

- All frontend code must go in `apps/web`.
- Use [shadcn/ui](https://ui.shadcn.com/) components and [Tailwind CSS](https://tailwindcss.com/) for UI.
- Use TypeScript for all files.
- **Global components** must live in `src/components`.
- **Page-specific components** must live in the relevant `src/app/[page]/components` folder.
- Shared hooks, utilities, and types should be placed in their respective folders under `src`.
- Use [TanStack Query](https://tanstack.com/query/latest) for all client based data fetching in the frontend. Implement queries and mutations inside the `src/hooks` directory.
- Server components should be used for data fetching where possible if the data does not change based on user interaction and does not need to be synchronized.
- Always prefer `useSuspenseQuery` in hooks to preload data on the server side for pages/components.
- Split query/mutation options (such as keys, fetchers, and config) into a separate `entity.options.ts` (or similar) file so they can be reused for prefetching and in hooks.

### 2. Backend Code

- All backend code must go in `apps/api`.
- Use [NestJS](https://nestjs.com/) and TypeScript only.
- Every service must be implemented as a NestJS module (e.g., `profile.service.module.ts`).
- Every controller must be implemented as a NestJS module (e.g., `profile.controller.module.ts`).
- Add each new controller module to `controller.module.ts`
- Organize code under `src/services` and `src/controllers`.
- Create controller dtos in `packages/types` and import them from `@repo/types`.
- Define dtos with `zod` in `packages/types` and infer TypeScript types from them. Example:
  ```ts
  import { z } from 'zod'

  export const UpdateProfileRequestSchema = z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
  })

  export type UpdateProfileRequest = z.infer<typeof UpdateProfileRequestSchema>
  ```
- Always validate incoming requests in controllers using `zod` schemas and return bad request appropriately.
- Services should define their own types in `service.types.ts` and must never import from `@repo/types`.
- Always map service responses to dtos before returning them from controllers.
- Use dependency injection for services and repositories.
- Always write unit tests for services and controllers using Jest.
- Always mock dependencies in unit tests.
- Use `@golevelup/ts-jest` for creating deep mocks of classes and interfaces.

### 3. Shared Types

- All shared data types (DTOs, interfaces, etc.) between frontend and backend must live in `packages/types`.
- Import shared types from `@repo/types` in both frontend and backend code. Example:
  ```ts
  import { ProfileResponse, UpdateProfileRequest } from '@repo/types/dto'
  ```

### 4. General

- Always use TypeScript for all code (no JavaScript files).
- Follow the existing folder structure and naming conventions.
- Use pnpm for dependency management and scripts.
- Use Turborepo for running, building, and caching tasks across the monorepo.
- Keep code modular and maintainable.

## Additional Notes

- Use ESLint and Prettier for code formatting and linting (see `packages/eslint-config`).
- All new packages or apps should follow the monorepo conventions.
- Document any new patterns or rules in this file.
