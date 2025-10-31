import type { Document } from "../types";
import VersionSorter from "./VersionSorter";

describe("VersionSorter", () => {
  it("should sort versions correctly", () => {
    const sorter = new VersionSorter();

    const doc1: Pick<Document, "version"> = { version: "13.0.0" };
    const doc2: Pick<Document, "version"> = { version: "1.0.1" };
    const doc3: Pick<Document, "version"> = { version: "2.1.0" };
    const doc4: Pick<Document, "version"> = { version: "2.13.0" };
    const doc5: Pick<Document, "version"> = { version: "1.0.11" };

    const documents = [doc1, doc2, doc3, doc4, doc5] as Document[];
    const sortedDocuments = documents.sort(sorter.sort);

    expect(sortedDocuments.map((doc) => doc.version)).toEqual([
      "1.0.1",
      "1.0.11",
      "2.1.0",
      "2.13.0",
      "13.0.0",
    ]);
  });
});
