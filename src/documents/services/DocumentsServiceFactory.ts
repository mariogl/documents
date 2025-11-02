import type { DocumentsClient } from "@documents/client/types";
import DocumentsStore from "@documents/store/DocumentsStore";

import DocumentsService from "./DocumentsService";

class DocumentsServiceFactory {
  static create(documentsClient: DocumentsClient): DocumentsService {
    const documentsStore = new DocumentsStore();
    return new DocumentsService(documentsClient, documentsStore);
  }

  static createForTesting(
    mockClient: DocumentsClient,
    mockStore?: DocumentsStore,
  ): DocumentsService {
    const store = mockStore ?? new DocumentsStore();
    return new DocumentsService(mockClient, store);
  }
}

export default DocumentsServiceFactory;
