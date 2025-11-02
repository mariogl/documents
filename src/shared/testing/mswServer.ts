import { setupServer } from "msw/node";

import { documentsHandlers } from "../../documents/handlers/documentsHandlers";

export const server = setupServer(...documentsHandlers);
