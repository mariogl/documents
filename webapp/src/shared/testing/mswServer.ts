import { setupServer } from "msw/node";

import { documentsHandlers } from "@documents/infrastructure/handlers/documentsHandlers";

export const server = setupServer(...documentsHandlers);
