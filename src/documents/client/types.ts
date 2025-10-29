import type { DocumentViewModel } from "../viewModel/types";

export interface DocumentsClient {
  getDocuments(): Promise<DocumentViewModel[]>;
}
