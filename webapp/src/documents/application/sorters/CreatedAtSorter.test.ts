import type { Document } from "@documents/domain/types";

import CreatedAtSorter from "./CreatedAtSorter";

describe("CreatedAtSorter", () => {
  it("should sort createdAt dates correctly", () => {
    const sorter = new CreatedAtSorter();

    const doc1: Pick<Document, "createdAt"> = {
      createdAt: new Date("2023-12-01T10:00:00Z"),
    };
    const doc2: Pick<Document, "createdAt"> = {
      createdAt: new Date("2022-06-15T12:30:00Z"),
    };
    const doc3: Pick<Document, "createdAt"> = {
      createdAt: new Date("2024-01-20T09:15:00Z"),
    };
    const doc4: Pick<Document, "createdAt"> = {
      createdAt: new Date("2021-11-05T14:45:00Z"),
    };
    const doc5: Pick<Document, "createdAt"> = {
      createdAt: new Date("2023-12-01T08:00:00Z"),
    };

    const documents = [doc1, doc2, doc3, doc4, doc5] as Document[];
    const sortedDocuments = documents.sort(sorter.sort);

    expect(sortedDocuments.map((doc) => doc.createdAt.toISOString())).toEqual([
      "2021-11-05T14:45:00.000Z",
      "2022-06-15T12:30:00.000Z",
      "2023-12-01T08:00:00.000Z",
      "2023-12-01T10:00:00.000Z",
      "2024-01-20T09:15:00.000Z",
    ]);
  });
});
