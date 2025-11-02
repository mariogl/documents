import { screen } from "@testing-library/dom";

import FetchDocumentsClient from "../../../documents/client/FetchDocumentsClient";
import { documentsServiceContext } from "../../../documents/context/documentsServiceContext";
import {
  marketingPlanDocumentDtoFixture,
  q1ReportDocumentDtoFixture,
  userResearchDocumentDtoFixture,
} from "../../../documents/fixtures/documentsFixtures";
import DocumentsServiceFactory from "../../../documents/services/DocumentsServiceFactory";
import { notificationsServiceContext } from "../../../notifications/context/notificationsServiceContext";
import type NotificationsService from "../../../notifications/services/NotificationsService";
import { render } from "../../testing/testUtils";
import AppComponent from "./App";

describe("App Component", () => {
  it("should render the documents list", async () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    documentsServiceContext.provide(
      DocumentsServiceFactory.create(new FetchDocumentsClient(apiBaseUrl)),
    );

    const dummyNotificationsService = {
      subscribe: () => {},
    } as Pick<NotificationsService, "subscribe">;

    notificationsServiceContext.provide(
      dummyNotificationsService as NotificationsService,
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
