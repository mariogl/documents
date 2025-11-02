import type { DocumentsSorter } from "@documents/sorters/types";
import type { Document } from "@documents/types";

class CreatedAtSorter implements DocumentsSorter {
  sort(documentA: Document, documentB: Document): number {
    return (
      new Date(documentA.createdAt).getTime() -
      new Date(documentB.createdAt).getTime()
    );
  }
}

export default CreatedAtSorter;
