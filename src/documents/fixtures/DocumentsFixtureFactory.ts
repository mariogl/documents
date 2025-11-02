import type { DocumentDto } from "@documents/dto/types";
import type { Document } from "@documents/types";
import { getRelativeDateString } from "@shared/dates/helpers";

class DocumentsFixtureFactory {
  static createDocumentFixture(overrides: Partial<Document> = {}): Document {
    return {
      id: crypto.randomUUID(),
      name: "Test Document",
      contributors: ["Alice Smith", "Bob Johnson"],
      attachments: ["file1", "file2", "file3"],
      version: "1.0.0",
      createdAt: new Date(),
      relativeCreatedAt: getRelativeDateString(new Date()),
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
