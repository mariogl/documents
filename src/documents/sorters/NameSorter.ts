import type { Document } from "@documents/types";

import type { DocumentsSorter } from "./types";

class NameSorter implements DocumentsSorter {
  sort(documentA: Document, documentB: Document): number {
    return documentA.name.localeCompare(documentB.name);
  }
}

export default NameSorter;
