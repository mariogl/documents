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
      ...overrides,
    };
  }
}

export default DocumentsFixtureFactory;
