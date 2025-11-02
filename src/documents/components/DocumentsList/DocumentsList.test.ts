import { screen } from "@testing-library/dom";

import { render } from "../../../testUtils";
import FetchDocumentsClient from "../../client/FetchDocumentsClient";
import { documentsServiceContext } from "../../context/documentsServiceContext";
import {
  coverLetterDocumentFixture,
  cvDocumentFixture,
} from "../../fixtures/documentsFixtures";
import DocumentsServiceFactory from "../../services/DocumentsServiceFactory";
import DocumentsStore from "../../store/DocumentsStore";
import DocumentsListComponent from "./DocumentsList";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

describe("DocumentsList Component", () => {
  it("should render no documents message when there are no documents", async () => {
    const documentsStore = new DocumentsStore();
    documentsStore.setDocuments([
      cvDocumentFixture,
      coverLetterDocumentFixture,
    ]);

    documentsServiceContext.provide(
      DocumentsServiceFactory.createForTesting(
        new FetchDocumentsClient(apiBaseUrl),
        documentsStore,
      ),
    );

    const documentsList = new DocumentsListComponent({});

    render(documentsList);

    const cvDocumentName = await screen.findByRole("heading", {
      name: RegExp(cvDocumentFixture.name, "i"),
    });
    const coverLetterDocumentName = await screen.findByRole("heading", {
      name: RegExp(coverLetterDocumentFixture.name, "i"),
    });

    expect(cvDocumentName).toBeInTheDocument();
    expect(coverLetterDocumentName).toBeInTheDocument();
  });
});
