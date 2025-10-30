import type { DocumentSortableProperties } from "../components/DocumentsSorting/DocumentsSorting";
import type { DocumentViewModel } from "../viewModel/types";

class DocumentsStore {
  private documents: DocumentViewModel[] = [];
  private sortBy: DocumentSortableProperties = "name";

  setDocuments(documents: DocumentViewModel[]): void {
    this.documents = [...documents];
  }

  getDocuments(): DocumentViewModel[] {
    return [...this.documents].sort((documentA, documentB) => {
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

  setSortBy(sortBy: DocumentSortableProperties): void {
    this.sortBy = sortBy;
  }
}

export default DocumentsStore;
