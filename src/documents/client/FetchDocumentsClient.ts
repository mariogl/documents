import type { DocumentDto } from "../dto/types";
import type { DocumentViewModel } from "../viewModel/types";
import BaseDocumentsClient from "./BaseDocumentsClient";

class FetchDocumentsClient extends BaseDocumentsClient {
  constructor(private baseUrl: string) {
    super();
  }

  async getDocuments(): Promise<DocumentViewModel[]> {
    const response = await fetch(`${this.baseUrl}/documents`);
    const documentsDto: DocumentDto[] = await response.json();

    return documentsDto.map(this.mapDocumentDtoToViewModel);
  }
}

export default FetchDocumentsClient;
