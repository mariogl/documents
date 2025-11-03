import { notificationsServiceContext } from "@notifications/application/context/notificationsServiceContext";
import type NotificationsService from "@notifications/application/services/NotificationsService";
import { screen } from "@testing-library/dom";

import { documentsServiceContext } from "@documents/application/context/documentsServiceContext";
import DocumentsServiceFactory from "@documents/application/services/DocumentsServiceFactory";
import {
  marketingPlanDocumentDtoFixture,
  q1ReportDocumentDtoFixture,
  userResearchDocumentDtoFixture,
} from "@documents/fixtures/documentsFixtures";
import FetchDocumentsClient from "@documents/infrastructure/client/FetchDocumentsClient";
import { errorDocumentsHandlers } from "@documents/infrastructure/handlers/documentsHandlers";
import { server } from "@shared/testing/mswServer";
import { render } from "@shared/testing/testUtils";

import AppComponent from "./App";

describe("App Component", () => {
  const dummyNotificationsService = {
    subscribe: () => {},
  } as Pick<NotificationsService, "subscribe">;

  notificationsServiceContext.provide(
    dummyNotificationsService as NotificationsService,
  );

  it("should render the documents list", async () => {
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    documentsServiceContext.provide(
      DocumentsServiceFactory.create(new FetchDocumentsClient(apiBaseUrl)),
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

  it("should show an error message when documents fail to load", async () => {
    server.use(...errorDocumentsHandlers);

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    documentsServiceContext.provide(
      DocumentsServiceFactory.create(new FetchDocumentsClient(apiBaseUrl)),
    );

    const app = new AppComponent({});
    render(app);

    const errorMessage = await screen.findByText(/failed to load documents/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
