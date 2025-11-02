import { http, HttpResponse } from "msw";

import { documentsDtoFixture } from "@documents/fixtures/documentsFixtures";
import type { DocumentDto } from "@documents/infrastructure/dto/types";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

export const documentsHandlers = [
  http.get(`${apiBaseUrl}/documents`, () => {
    return HttpResponse.json<DocumentDto[]>(documentsDtoFixture);
  }),
];

export const errorDocumentsHandlers = [
  http.get(`${apiBaseUrl}/documents`, () =>
    HttpResponse.json({}, { status: 500 }),
  ),
];
