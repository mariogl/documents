import type { Document, NewDocumentData } from "@documents/types";

export interface DocumentsClient {
  getDocuments(): Promise<Document[]>;
  saveDocument(newDocumentData: NewDocumentData): Promise<Document>;
}
