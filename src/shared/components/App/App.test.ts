import { screen } from "@testing-library/dom";

import FakeDocumentsClient from "../../../documents/client/FakeDocumentsClient";
import { documentsServiceContext } from "../../../documents/context/DocumentsContext";
import {
  marketingPlanDocumentDtoFixture,
  q1ReportDocumentDtoFixture,
  userResearchDocumentDtoFixture,
} from "../../../documents/fixtures/documentsFixtures";
import DocumentsServiceFactory from "../../../documents/services/DocumentsServiceFactory";
import { render } from "../../../testUtils";
import AppComponent from "./App";
describe("App Component", () => {
  it("should render the documents list", async () => {
    documentsServiceContext.provide(
      DocumentsServiceFactory.createForTesting(new FakeDocumentsClient()),
    );

    const app = new AppComponent({});
    render(app);

    const q1ReportDocumentName = await screen.findByRole("heading", {
      name: RegExp(q1ReportDocumentDtoFixture.Title, "i"),
    });
    const userResearchDocumentName = await screen.findByRole("heading", {
      name: RegExp(userResearchDocumentDtoFixture.Title, "i"),
    });
    const marketingPlanDocumentName = await screen.findByRole("heading", {
      name: RegExp(marketingPlanDocumentDtoFixture.Title, "i"),
    });

    expect(q1ReportDocumentName).toBeInTheDocument();
    expect(userResearchDocumentName).toBeInTheDocument();
    expect(marketingPlanDocumentName).toBeInTheDocument();
  });
});
