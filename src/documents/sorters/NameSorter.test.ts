import type { DocumentViewModel } from "../viewModel/types";
import NameSorter from "./NameSorter";

describe("NameSorter", () => {
  it("should sort names correctly", () => {
    const sorter = new NameSorter();

    const doc1: Pick<DocumentViewModel, "name"> = { name: "Report Q4" };
    const doc2: Pick<DocumentViewModel, "name"> = { name: "Annual Summary" };
    const doc3: Pick<DocumentViewModel, "name"> = { name: "Budget Plan" };
    const doc4: Pick<DocumentViewModel, "name"> = { name: "Budapest Report" };
    const doc5: Pick<DocumentViewModel, "name"> = { name: "2025 Report" };

    const documents = [doc1, doc2, doc3, doc4, doc5] as DocumentViewModel[];
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
