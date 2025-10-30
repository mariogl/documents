import type { DocumentSortableProperties } from "../components/DocumentsSorting/DocumentsSorting";
import DocumentsSorterFactory from "../sorters/DocumentsSorterFactory";
import type { DocumentViewModel } from "../viewModel/types";

class DocumentsStore {
  private documents: DocumentViewModel[] = [];
  private sortBy: DocumentSortableProperties = "name";
  private listeners = new Set<() => void>();

  setDocuments(documents: DocumentViewModel[]): void {
    this.documents = [...documents];
    this.notifyListeners();
  }

  getDocuments(): DocumentViewModel[] {
    const sorter = DocumentsSorterFactory.create(this.sortBy);
    return [...this.documents].sort(sorter.sort);
  }

  getSortBy(): DocumentSortableProperties {
    return this.sortBy;
  }

  setSortBy(sortBy: DocumentSortableProperties): void {
    this.sortBy = sortBy;
    this.notifyListeners();
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export default DocumentsStore;
