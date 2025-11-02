import Store from "../../shared/store/Store";
import type { DocumentSortableProperties } from "../components/DocumentsSorting/DocumentsSorting";
import DocumentsSorterFactory from "../sorters/DocumentsSorterFactory";
import type { Document } from "../types";

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
