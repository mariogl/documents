# Documents App webapp

A small front-end application built with TypeScript and a lightweight component system over the DOM. It lists documents, allows sorting and layout switching, adds new documents via a form, and displays real-time notifications.

## Contents

- [Getting started](#getting-started)
- [Tech stack](#tech-stack)
- [Features](#features)
- [Architecture](#architecture)
- [Design patterns and decisions](#design-patterns-and-decisions)
- [Notable trade-offs and intentional overabstractions](#notable-trade-offs-and-intentional-overabstractions)
- [Testing](#testing)
- [Accessibility](#accessibility)
- [CI](#ci)
- [Future refactors](#future-refactors)
- [Conventions](#conventions)

## Getting started

1. Install: `npm install`
2. Development: `npm run dev`
3. Tests: `npm test`

Environment variables:

- `VITE_API_BASE_URL`
- `VITE_WS_NOTIFICATIONS_BASE_URL`

## Tech stack

- TypeScript
- Vite
- Vitest + Testing Library + MSW
- Playwright for E2E
- No UI framework; custom DOM component abstraction

## Features

- Documents list fetched from API REST
- Sorting by name, version, created date
- Layout switching between list and grid, with mobile default
- Add document form in a modal
- Success and error toasts
- Notifications counter via WebSocket
- Loading indicator driven by a global UI store

## Architecture

The folder structure has been chosen with the "screaming architecture" principle in mind: the top-level folders reflect the application's business concepts, not implementation details.

Within each module, a layered architecture is followed to separate concerns:

- Domain: Types and Business models
- Application: Services, stores, factories, DI contexts, sorters
- Infrastructure: API and WS clients, DTO mapping, test handlers
- Presentation: UI components, media query helper, CSS modules
- Shared: base `Component`, `Store`, `Context`, config, date helpers, testing utilities

The entry point wires environment, constructs services, provides contexts, connects notifications, and mounts the `App` component.

## Design patterns and decisions

- Dependency Injection: `Context<T>` provides services across presentation. Factory used to build service+store for runtime and testing.
- Store/Observer: `Store` base with `subscribe`/`notifyListeners`; specialized stores for documents, notifications, and UI state.
- Strategy: sorting via `DocumentsSorter` implementations and `DocumentsSorterFactory`.
- Adapter: `FetchDocumentsClient` and `WebSocketNotificationsClient` implement IO ports behind interfaces.
- Presentation abstraction: minimal `Component` base with `render`, `getElement`, and `rerender`.

## Notable trade-offs and intentional overabstractions

Some abstractions are intentionally richer than needed to enable discussion on front-end design:

- Sorting strategies as classes behind a factory. A simple comparator map would work; the current approach highlights an extension seam.
- `BaseDocumentsClient` with a shared DTO mapper. It could be a helper, kept as a base class to illustrate reuse and specialization.
- Explicit DI via `Context<T>` and service factory rather than ad-hoc singletons to keep dependencies visible and tests trivial.

Known simplifications deliberately not applied:

- Collapsing sorters into inline comparators
- Collapsing layout helpers into the components

## Testing

- Unit tests
- Integration-style tests using MSW
- Testing Library DOM queries focused on behavior and accessibility
- E2E tests with Playwright covering the documents creation flow

## Accessibility

- Keyboard navigation
- Labels correctly associated with inputs
- ARIA roles and live regions
- Decorative icons marked `aria-hidden`
- Focus management for toasts and layout toggles
- Semantic HTML

## CI

- Husky hooks for linting and tests on commit
- GitHub Actions workflow for linting, tests, and E2E on push

## Future refactors

- Form validation
  - Extract pure validation from the form component into a function returning field errors
- Decouple application and presentation
  - Remove UI concerns from `DocumentsService` by injecting interfaces for loading/feedback or emitting service states
- WebSocket reconnection
  - Add exponential backoff with jitter, a maximum retry limit, and proper cancellation in `disconnect`
- Sorting
  - Optionally replace strategy classes with a comparator map if requirements remain simple
- Minor cleanups
  - Remove redundant local state where the source of truth is already the store or service

## Conventions

- One component per folder, with its `.ts`, `.module.css`, and `.test.ts` when applicable
- No `any` in TypeScript
- Tests focus on behavior, not implementation details
- Small, verifiable steps
- Identifiers in English without abbreviations; prefer `index` over `i`
- BEM for CSS class names
- Conventional commits
