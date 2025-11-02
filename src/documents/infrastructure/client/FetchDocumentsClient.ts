import type { Document, NewDocumentData } from "@documents/domain/types";
import type { DocumentDto } from "@documents/infrastructure/dto/types";
import { getRelativeDateString } from "@shared/dates/helpers";

import BaseDocumentsClient from "./BaseDocumentsClient";

class FetchDocumentsClient extends BaseDocumentsClient {
  constructor(private baseUrl: string) {
    super();
  }

  async getDocuments(): Promise<Document[]> {
    try {
      const response = await fetch(`${this.baseUrl}/documents`);

      if (!response.ok) {
        throw new Error();
      }

      const documentsDto: DocumentDto[] = await response.json();

      return documentsDto.map(this.mapDocumentDtoToViewModel);
    } catch (error) {
      throw new Error("Failed to fetch documents: " + (error as Error).message);
    }
  }

  async saveDocument(newDocumentData: NewDocumentData): Promise<Document> {
    const document: Document = {
      ...newDocumentData,
      id: crypto.randomUUID(),
      createdAt: new Date(),
      relativeCreatedAt: getRelativeDateString(new Date()),
    };

    return document;
  }
}

export default FetchDocumentsClient;
