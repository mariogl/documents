import type { Document } from "@documents/domain/types";

import NameSorter from "./NameSorter";

describe("NameSorter", () => {
  it("should sort names correctly", () => {
    const sorter = new NameSorter();

    const doc1: Pick<Document, "name"> = { name: "Report Q4" };
    const doc2: Pick<Document, "name"> = { name: "Annual Summary" };
    const doc3: Pick<Document, "name"> = { name: "Budget Plan" };
    const doc4: Pick<Document, "name"> = { name: "Budapest Report" };
    const doc5: Pick<Document, "name"> = { name: "2025 Report" };

    const documents = [doc1, doc2, doc3, doc4, doc5] as Document[];
    const sortedDocuments = documents.sort(sorter.sort);

    expect(sortedDocuments.map((doc) => doc.name)).toEqual([
      "2025 Report",
      "Annual Summary",
      "Budapest Report",
      "Budget Plan",
      "Report Q4",
    ]);
  });
});
