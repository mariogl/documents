import type { Document } from "@documents/domain/types";

export interface DocumentsSorter {
  sort(documentA: Document, documentB: Document): number;
}
