import FetchDocumentsClient from "./documents/client/FetchDocumentsClient";
import { documentsServiceContext } from "./documents/context/DocumentsContext";
import DocumentsServiceFactory from "./documents/services/DocumentsServiceFactory";
import AppComponent from "./shared/components/App/App";

import "./shared/styles/index.css";

const apiUrlBase = import.meta.env.VITE_API_URL_BASE;

documentsServiceContext.provide(
  DocumentsServiceFactory.create(new FetchDocumentsClient(apiUrlBase)),
);

const app = new AppComponent({});

const rootElement = document.body;
rootElement.prepend(app.getElement());
