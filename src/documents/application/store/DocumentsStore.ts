import DocumentsSorterFactory from "@documents/application/sorters/DocumentsSorterFactory";
import type { Document } from "@documents/domain/types";
import type { DocumentSortableProperties } from "@documents/presentation/components/DocumentsSorting/DocumentsSorting";
import Store from "@shared/application/store/Store";

class DocumentsStore extends Store {
  private documents: Document[] = [];
  private sortBy: DocumentSortableProperties = "name";

  setDocuments(documents: Document[]): void {
    this.documents = [...documents];
    this.notifyListeners();
  }

  getDocuments(): Document[] {
    const sorter = DocumentsSorterFactory.create(this.sortBy);
    return [...this.documents].sort(sorter.sort);
  }

  addDocument(document: Document): void {
    this.documents.push(document);
    this.notifyListeners();
  }

  getSortBy(): DocumentSortableProperties {
    return this.sortBy;
  }

  setSortBy(sortBy: DocumentSortableProperties): void {
    this.sortBy = sortBy;
    this.notifyListeners();
  }
}

export default DocumentsStore;
