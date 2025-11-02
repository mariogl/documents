import { screen } from "@testing-library/dom";

import {
  coverLetterDocumentFixture,
  cvDocumentFixture,
} from "@documents/fixtures/documentsFixtures";
import type { Document } from "@documents/types";
import { render } from "@shared/testing/testUtils";

import DocumentsComponent from "./Documents";

describe("Documents Component", () => {
  it("should render the list of documents", () => {
    const documentFixtures: Document[] = [
      cvDocumentFixture,
      coverLetterDocumentFixture,
    ];

    const documentsGrid = new DocumentsComponent({
      documents: documentFixtures,
      layoutType: "grid",
    });
    render(documentsGrid);

    const cvDocumentName = screen.getByRole("heading", {
      name: RegExp(cvDocumentFixture.name, "i"),
    });
    const coverLetterDocumentName = screen.getByRole("heading", {
      name: RegExp(coverLetterDocumentFixture.name, "i"),
    });

    expect(cvDocumentName).toBeInTheDocument();
    expect(coverLetterDocumentName).toBeInTheDocument();
  });
});
