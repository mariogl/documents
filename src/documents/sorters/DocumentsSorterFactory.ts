import type { DocumentSortableProperties } from "@documents/components/DocumentsSorting/DocumentsSorting";

import CreatedAtSorter from "./CreatedAtSorter";
import NameSorter from "./NameSorter";
import type { DocumentsSorter } from "./types";
import VersionSorter from "./VersionSorter";

class DocumentsSorterFactory {
  private static sorters: Record<DocumentSortableProperties, DocumentsSorter> =
    {
      name: new NameSorter(),
      createdAt: new CreatedAtSorter(),
      version: new VersionSorter(),
    };

  static create(sortBy: DocumentSortableProperties): DocumentsSorter {
    const sorter = this.sorters[sortBy];

    return sorter;
  }
}

export default DocumentsSorterFactory;
