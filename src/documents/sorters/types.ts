import type { Document } from "@documents/types";

export interface DocumentsSorter {
  sort(documentA: Document, documentB: Document): number;
}
