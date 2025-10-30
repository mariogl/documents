import type { DocumentsClient } from "../client/types";
import type { DocumentSortableProperties } from "../components/DocumentsSorting/DocumentsSorting";
import type { DocumentViewModel } from "../viewModel/types";

class DocumentsService {
  private documents: DocumentViewModel[] = [];
  private sortBy: DocumentSortableProperties = "name";

  constructor(private documentsClient: DocumentsClient) {}

  async loadDocuments(): Promise<void> {
    this.documents = await this.documentsClient.getDocuments();
  }

  getDocuments(): DocumentViewModel[] {
    return this.documents.sort((documentA, documentB) => {
      switch (this.sortBy) {
        case "name":
          return documentA.name.localeCompare(documentB.name);
        case "createdAt":
          return (
            new Date(documentA.createdAt).getTime() -
            new Date(documentB.createdAt).getTime()
          );
        case "version": {
          const versionANumbers = documentA.version.split(".").map(Number);
          const versionBNumbers = documentB.version.split(".").map(Number);

          for (
            let i = 0;
            i < Math.max(versionANumbers.length, versionBNumbers.length);
            i++
          ) {
            const versionANumber = versionANumbers[i] || 0;
            const versionBNumber = versionBNumbers[i] || 0;

            if (versionANumber !== versionBNumber) {
              return versionANumber - versionBNumber;
            }
          }

          return 0;
        }
      }
    });
  }

  getSortBy(): DocumentSortableProperties {
    return this.sortBy;
  }

  setSortBy(sortBy: DocumentSortableProperties) {
    this.sortBy = sortBy;
  }
}

export default DocumentsService;
