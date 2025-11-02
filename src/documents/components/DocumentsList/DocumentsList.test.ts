import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import FetchDocumentsClient from "@documents/client/FetchDocumentsClient";
import { documentsServiceContext } from "@documents/context/documentsServiceContext";
import {
  coverLetterDocumentFixture,
  cvDocumentFixture,
} from "@documents/fixtures/documentsFixtures";
import DocumentsServiceFactory from "@documents/services/DocumentsServiceFactory";
import DocumentsStore from "@documents/store/DocumentsStore";
import { render } from "@shared/testing/testUtils";

import DocumentsListComponent from "./DocumentsList";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const user = userEvent.setup();

describe("DocumentsList Component", () => {
  it("should render document names", async () => {
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

  it("should render no documents message when there are no documents", async () => {
    const documentsStore = new DocumentsStore();

    documentsServiceContext.provide(
      DocumentsServiceFactory.createForTesting(
        new FetchDocumentsClient(apiBaseUrl),
        documentsStore,
      ),
    );

    const documentsList = new DocumentsListComponent({});

    render(documentsList);

    const noDocumentsMessage = await screen.findByText(
      /no documents available/i,
    );

    expect(noDocumentsMessage).toBeInTheDocument();
  });

  it("should allow adding a new document", async () => {
    const newTestDocumentName = "New Test Document";
    const documentsStore = new DocumentsStore();

    documentsServiceContext.provide(
      DocumentsServiceFactory.createForTesting(
        new FetchDocumentsClient(apiBaseUrl),
        documentsStore,
      ),
    );

    const documentsList = new DocumentsListComponent({});

    render(documentsList);

    const addDocumentButton = await screen.findByRole("button", {
      name: /add document/i,
    });

    await user.click(addDocumentButton);

    const newDocumentNameInput = await screen.findByLabelText(/name/i);
    await user.type(newDocumentNameInput, newTestDocumentName);

    const newDocumentVersionInput = await screen.findByLabelText(/version/i);
    await user.type(newDocumentVersionInput, "1.13.4");

    const submitButton = await screen.findByRole("button", {
      name: /create document/i,
    });

    await user.click(submitButton);

    const newDocumentName = await screen.findByRole("heading", {
      name: newTestDocumentName,
    });

    expect(newDocumentName).toBeInTheDocument();
  });
});
