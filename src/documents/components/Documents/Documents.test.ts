import { screen } from "@testing-library/dom";

import { render } from "../../../testUtils";
import DocumentsFixtureFactory from "../../fixtures/DocumentsFixtureFactory";
import type { Document } from "../../types";
import DocumentsComponent from "./Documents";

describe("Documents Component", () => {
  it("should render the list of documents", () => {
    const cvDocumentFixture: Document =
      DocumentsFixtureFactory.createDocumentFixture({
        name: "CV - Danielle Rossi",
      });
    const coverLetterDocumentFixture: Document =
      DocumentsFixtureFactory.createDocumentFixture({
        name: "Cover Letter - Danielle Rossi",
      });
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
