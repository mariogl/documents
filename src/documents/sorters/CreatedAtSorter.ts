import type { DocumentsSorter } from "../sorters/types";
import type { DocumentViewModel } from "../viewModel/types";

class CreatedAtSorter implements DocumentsSorter {
  sort(documentA: DocumentViewModel, documentB: DocumentViewModel): number {
    return (
      new Date(documentA.createdAt).getTime() -
      new Date(documentB.createdAt).getTime()
    );
  }
}

export default CreatedAtSorter;
