import type { Document } from "../types";

export interface DocumentsSorter {
  sort(documentA: Document, documentB: Document): number;
}
