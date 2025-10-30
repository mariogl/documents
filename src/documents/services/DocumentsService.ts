import type { DocumentsClient } from "../client/types";
import type { DocumentSortableProperties } from "../components/DocumentsSorting/DocumentsSorting";
import type DocumentsStore from "../store/DocumentsStore";
import type { DocumentViewModel } from "../viewModel/types";

class DocumentsService {
  constructor(
    private documentsClient: DocumentsClient,
    private documentsStore: DocumentsStore,
  ) {}

  async loadDocuments(): Promise<void> {
    const documents = await this.documentsClient.getDocuments();

    this.documentsStore.setDocuments(documents);
  }

  getDocuments(): DocumentViewModel[] {
    return this.documentsStore.getDocuments();
  }

  getSortBy(): DocumentSortableProperties {
    return this.documentsStore.getSortBy();
  }

  setSortBy(sortBy: DocumentSortableProperties): void {
    this.documentsStore.setSortBy(sortBy);
  }
}

export default DocumentsService;
