import WebSocketNotificationsClient from "@notifications/client/WebSocketNotificationsClient";
import { notificationsServiceContext } from "@notifications/context/notificationsServiceContext";
import NotificationsService from "@notifications/services/NotificationsService";
import NotificationsStore from "@notifications/store/NotificationsStore";

import { documentsServiceContext } from "@documents/application/context/documentsServiceContext";
import DocumentsServiceFactory from "@documents/application/services/DocumentsServiceFactory";
import FetchDocumentsClient from "@documents/infrastructure/client/FetchDocumentsClient";
import AppComponent from "@shared/components/App/App";

import "@shared/styles/index.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const wsUrl = import.meta.env.VITE_WS_NOTIFICATIONS_URL;

documentsServiceContext.provide(
  DocumentsServiceFactory.create(new FetchDocumentsClient(apiBaseUrl)),
);

const notificationsService = new NotificationsService(
  new WebSocketNotificationsClient(wsUrl),
  new NotificationsStore(),
);

notificationsServiceContext.provide(notificationsService);

notificationsService.connect();

const app = new AppComponent({});

const rootElement = document.body;
rootElement.prepend(app.getElement());
