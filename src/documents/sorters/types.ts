import type { DocumentViewModel } from "../viewModel/types";

export interface DocumentsSorter {
  sort(documentA: DocumentViewModel, documentB: DocumentViewModel): number;
}
