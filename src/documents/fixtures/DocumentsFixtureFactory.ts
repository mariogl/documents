import type { DocumentDto } from "../dto/types";
import type { DocumentViewModel } from "../viewModel/types";

class DocumentsFixtureFactory {
  static createDocumentFixture(
    overrides: Partial<DocumentViewModel> = {},
  ): DocumentViewModel {
    return {
      id: crypto.randomUUID(),
      name: "Test Document",
      contributors: ["Alice Smith", "Bob Johnson"],
      attachments: ["file1", "file2", "file3"],
      version: "1.0.0",
      createdAt: new Date(),
      ...overrides,
    };
  }

  static createDocumentDtoFixture(
    overrides: Partial<DocumentDto> = {},
  ): DocumentDto {
    return {
      ID: crypto.randomUUID(),
      Title: "Document",
      Contributors: [
        { ID: crypto.randomUUID(), Name: "John Doe" },
        { ID: crypto.randomUUID(), Name: "Jane Doe" },
      ],
      Attachments: ["file1", "file2"],
      Version: "2.15.4",
      CreatedAt: new Date().toISOString(),
      ...overrides,
    };
  }
}

export default DocumentsFixtureFactory;
