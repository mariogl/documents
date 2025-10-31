import type { DocumentDto } from "../dto/types";
import type { Document, NewDocumentData } from "../types";
import BaseDocumentsClient from "./BaseDocumentsClient";

class FetchDocumentsClient extends BaseDocumentsClient {
  constructor(private baseUrl: string) {
    super();
  }

  async getDocuments(): Promise<Document[]> {
    const response = await fetch(`${this.baseUrl}/documents`);
    const documentsDto: DocumentDto[] = await response.json();

    return documentsDto.map(this.mapDocumentDtoToViewModel);
  }

  async saveDocument(_newDocumentData: NewDocumentData): Promise<Document> {
    throw new Error("Method not implemented.");
  }
}

export default FetchDocumentsClient;
