import FetchDocumentsClient from "./documents/client/FetchDocumentsClient";
import DocumentsServiceFactory from "./documents/services/DocumentsServiceFactory";
import AppComponent from "./shared/components/App/App";

import "./shared/styles/index.css";

const apiUrlBase = import.meta.env.VITE_API_URL_BASE;

const app = new AppComponent({
  documentsService: DocumentsServiceFactory.create(
    new FetchDocumentsClient(apiUrlBase),
  ),
});

const rootElement = document.body;
rootElement.prepend(app.getElement());
