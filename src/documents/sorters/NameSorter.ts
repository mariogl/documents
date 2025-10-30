import type { DocumentsSorter } from "../sorters/types";
import type { DocumentViewModel } from "../viewModel/types";

class NameSorter implements DocumentsSorter {
  sort(documentA: DocumentViewModel, documentB: DocumentViewModel): number {
    return documentA.name.localeCompare(documentB.name);
  }
}

export default NameSorter;
