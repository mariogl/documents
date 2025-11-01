import FetchDocumentsClient from "./documents/client/FetchDocumentsClient";
import { documentsServiceContext } from "./documents/context/documentsServiceContext";
import DocumentsServiceFactory from "./documents/services/DocumentsServiceFactory";
import WebSocketNotificationsClient from "./notifications/client/WebSocketNotificationsClient";
import AppComponent from "./shared/components/App/App";

import "./shared/styles/index.css";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;
const wsUrl = import.meta.env.VITE_WS_NOTIFICATIONS_URL;

documentsServiceContext.provide(
  DocumentsServiceFactory.create(new FetchDocumentsClient(apiBaseUrl)),
);

new WebSocketNotificationsClient(wsUrl).connect();

const app = new AppComponent({});

const rootElement = document.body;
rootElement.prepend(app.getElement());
