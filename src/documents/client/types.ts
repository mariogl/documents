import type { Document, NewDocumentData } from "../types";

export interface DocumentsClient {
  getDocuments(): Promise<Document[]>;
  saveDocument(newDocumentData: NewDocumentData): Promise<Document>;
}
