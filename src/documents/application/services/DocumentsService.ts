import type DocumentsStore from "@documents/application/store/DocumentsStore";
import type { Document, NewDocumentData } from "@documents/domain/types";
import type { DocumentsClient } from "@documents/infrastructure/client/types";
import type { DocumentSortableProperties } from "@documents/presentation/components/DocumentsSorting/DocumentsSorting";
import { uiStore } from "@shared/store/UiStore";
import { toast } from "@shared/toast/ToastService";

class DocumentsService {
  constructor(
    private documentsClient: DocumentsClient,
    private documentsStore: DocumentsStore,
  ) {}

  async loadDocuments(): Promise<void> {
    try {
      uiStore.startLoading();
      const documents = await this.documentsClient.getDocuments();
      uiStore.stopLoading();

      this.documentsStore.setDocuments(documents);
    } catch {
      toast.show({
        type: "error",
        message: "Failed to load documents. Please try again later.",
      });
      uiStore.stopLoading();
    }
  }

  getDocuments(): Document[] {
    return this.documentsStore.getDocuments();
  }

  async addDocument(newDocumentData: NewDocumentData): Promise<void> {
    uiStore.startLoading();
    const document = await this.documentsClient.saveDocument(newDocumentData);
    uiStore.stopLoading();

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
