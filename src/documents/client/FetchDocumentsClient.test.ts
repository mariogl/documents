import { server } from "../../shared/testing/mswServer";
import { documentsDtoFixture } from "../fixtures/documentsFixtures";
import { errorDocumentsHandlers } from "../handlers/documentsHandlers";
import FetchDocumentsClient from "./FetchDocumentsClient";

describe("FetchDocumentsClient", () => {
  it("should return mapped documents from the API", async () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const client = new FetchDocumentsClient(apiBaseUrl);

    const documents = await client.getDocuments();

    documents.forEach((document, index) => {
      const expectedDocumentDto = documentsDtoFixture[index];
      expect(document.id).toBe(expectedDocumentDto.ID);
      expect(document.name).toBe(expectedDocumentDto.Title);
      expect(document.version).toBe(expectedDocumentDto.Version);
    });
  });

  it("should throw an error when the API request fails", async () => {
    const invalidApiBaseUrl = "invalid-api-url";
    const client = new FetchDocumentsClient(invalidApiBaseUrl);

    await expect(client.getDocuments()).rejects.toThrow(
      "Failed to fetch documents",
    );
  });

  it("should throw an error when the API returns a non-ok response", async () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
    const client = new FetchDocumentsClient(apiBaseUrl);

    server.use(...errorDocumentsHandlers);

    await expect(client.getDocuments()).rejects.toThrow(
      "Failed to fetch documents",
    );
  });
});
