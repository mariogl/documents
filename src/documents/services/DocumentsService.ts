import type { DocumentsClient } from "../client/types";
import type { DocumentSortableProperties } from "../components/DocumentsSorting/DocumentsSorting";
import type DocumentsStore from "../store/DocumentsStore";
import type { Document, NewDocumentData } from "../types";

class DocumentsService {
  constructor(
    private documentsClient: DocumentsClient,
    private documentsStore: DocumentsStore,
  ) {}

  async loadDocuments(): Promise<void> {
    const documents = await this.documentsClient.getDocuments();

    this.documentsStore.setDocuments(documents);
  }

  getDocuments(): Document[] {
    return this.documentsStore.getDocuments();
  }

  async addDocument(newDocumentData: NewDocumentData): Promise<void> {
    const document = await this.documentsClient.saveDocument(newDocumentData);

    this.documentsStore.addDocument(document);
  }

  getSortBy(): DocumentSortableProperties {
    return this.documentsStore.getSortBy();
  }

  setSortBy(sortBy: DocumentSortableProperties): void {
    this.documentsStore.setSortBy(sortBy);
  }

  subscribe(listener: () => void) {
    this.documentsStore.subscribe(listener);
  }
}

export default DocumentsService;
