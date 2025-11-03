import { screen } from "@testing-library/dom";

import type { Document } from "@documents/domain/types";
import DocumentsFixtureFactory from "@documents/fixtures/DocumentsFixtureFactory";
import { render } from "@shared/testing/testUtils";

import DocumentItemComponent from "./DocumentItem";

describe("DocumentItem Component", () => {
  let documentFixture: Document;

  beforeEach(() => {
    documentFixture = DocumentsFixtureFactory.createDocumentFixture();
  });

  it("should render the document's name and version", () => {
    const documentCard = new DocumentItemComponent({
      document: documentFixture,
      layoutType: "grid",
    });
    render(documentCard);

    const documentName = screen.getByRole("heading", {
      name: new RegExp(documentFixture.name, "i"),
    });
    const documentVersion = screen.getByText(
      new RegExp(documentFixture.version, "i"),
    );

    expect(documentName).toBeInTheDocument();
    expect(documentVersion).toBeInTheDocument();
  });

  it("should render the document's data", () => {
    const documentCard = new DocumentItemComponent({
      document: documentFixture,
      layoutType: "grid",
    });
    render(documentCard);

    documentFixture.contributors.forEach((contributor) => {
      const contributorElement = screen.getByText(new RegExp(contributor, "i"));
      expect(contributorElement).toBeInTheDocument();
    });

    documentFixture.attachments.forEach((attachment) => {
      const attachmentElement = screen.getByText(new RegExp(attachment, "i"));
      expect(attachmentElement).toBeInTheDocument();
    });
  });
});
