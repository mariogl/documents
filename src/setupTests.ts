import { server } from "./shared/testing/mswServer";

import "@testing-library/jest-dom/vitest";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

beforeEach(() => {
  document.body.innerHTML = "";
});
