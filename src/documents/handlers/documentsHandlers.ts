import { http, HttpResponse } from "msw";

import type { DocumentDto } from "@documents/dto/types";
import { documentsDtoFixture } from "@documents/fixtures/documentsFixtures";

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
