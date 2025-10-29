import type { DocumentDto } from "../dto/types";
import type { DocumentViewModel } from "../viewModel/types";
import BaseDocumentsClient from "./BaseDocumentsClient";

class FetchDocumentsClient extends BaseDocumentsClient {
  async getDocuments(): Promise<DocumentViewModel[]> {
    const response = await fetch("http://localhost:8080/documents");
    const documentsDto: DocumentDto[] = await response.json();

    return documentsDto.map(this.mapDocumentDtoToViewModel);
  }
}

export default FetchDocumentsClient;
