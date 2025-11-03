import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

import { render } from "../../../../shared/testing/testUtils";
import { documentsServiceContext } from "../../../application/context/documentsServiceContext";
import DocumentsServiceFactory from "../../../application/services/DocumentsServiceFactory";
import DocumentsStore from "../../../application/store/DocumentsStore";
import DocumentsFixtureFactory from "../../../fixtures/DocumentsFixtureFactory";
import FetchDocumentsClient from "../../../infrastructure/client/FetchDocumentsClient";
import DocumentsListComponent from "./DocumentsList";

describe("DocumentsList Component", () => {
  const document1Fixture = DocumentsFixtureFactory.createDocumentFixture({
    name: "Report C102",
    version: "13.5.1",
    createdAt: new Date("2023-01-15T10:00:00Z"),
  });
  const document2Fixture = DocumentsFixtureFactory.createDocumentFixture({
    name: "Report A2",
    version: "3.0.2",
    createdAt: new Date("2024-01-10T10:00:00Z"),
  });
  const document3Fixture = DocumentsFixtureFactory.createDocumentFixture({
    name: "Report N11",
    version: "2.6.0",
    createdAt: new Date("2021-01-12T10:00:00Z"),
  });

  const documentsStore = new DocumentsStore();
  documentsStore.setDocuments([
    document1Fixture,
    document2Fixture,
    document3Fixture,
  ]);

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
  const documentsService = DocumentsServiceFactory.createForTesting(
    new FetchDocumentsClient(apiBaseUrl),
    documentsStore,
  );
  documentsServiceContext.provide(documentsService);

  it("should sort documents by name", async () => {
    const initialSortingCriterium = "createdAt";

    documentsStore.setSortBy(initialSortingCriterium);

    const documentsList = new DocumentsListComponent({});
    render(documentsList);

    const sortingSelect = screen.getByLabelText(/sort by/i);

    await user.selectOptions(sortingSelect, "name");

    const documentHeadings = screen.getAllByRole("heading");

    expect(documentHeadings[0]).toHaveTextContent(document2Fixture.name);
    expect(documentHeadings[1]).toHaveTextContent(document1Fixture.name);
    expect(documentHeadings[2]).toHaveTextContent(document3Fixture.name);
  });

  it("should sort documents by creation date", async () => {
    const initialSortingCriterium = "name";
    documentsStore.setSortBy(initialSortingCriterium);

    const documentsList = new DocumentsListComponent({});
    render(documentsList);

    const sortingSelect = screen.getByLabelText(/sort by/i);

    await user.selectOptions(sortingSelect, "createdAt");

    const documentHeadings = screen.getAllByRole("heading");

    expect(documentHeadings[0]).toHaveTextContent(document3Fixture.name);
    expect(documentHeadings[1]).toHaveTextContent(document1Fixture.name);
    expect(documentHeadings[2]).toHaveTextContent(document2Fixture.name);
  });

  it("should sort documents by name", async () => {
    const initialSortingCriterium = "createdAt";
    documentsStore.setSortBy(initialSortingCriterium);

    const documentsList = new DocumentsListComponent({});
    render(documentsList);

    const sortingSelect = screen.getByLabelText(/sort by/i);

    await user.selectOptions(sortingSelect, "name");

    const documentHeadings = screen.getAllByRole("heading");

    expect(documentHeadings[0]).toHaveTextContent(document2Fixture.name);
    expect(documentHeadings[1]).toHaveTextContent(document1Fixture.name);
    expect(documentHeadings[2]).toHaveTextContent(document3Fixture.name);
  });
});
