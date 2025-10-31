import type { DocumentsSorter } from "../sorters/types";
import type { Document } from "../types";

class NameSorter implements DocumentsSorter {
  sort(documentA: Document, documentB: Document): number {
    return documentA.name.localeCompare(documentB.name);
  }
}

export default NameSorter;
