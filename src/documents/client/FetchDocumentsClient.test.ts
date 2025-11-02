import { documentsDtoFixture } from "../fixtures/documentsFixtures";
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
});
