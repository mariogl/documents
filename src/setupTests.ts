import { setupServer } from "msw/node";

import { handlers as documentsHandlers } from "./documents/handlers/documentsHandlers";

import "@testing-library/jest-dom/vitest";

const server = setupServer(...documentsHandlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  document.body.innerHTML = "";
});
