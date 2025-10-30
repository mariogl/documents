import FetchDocumentsClient from "./documents/client/FetchDocumentsClient";
import DocumentsService from "./documents/services/DocumentsService";
import DocumentsStore from "./documents/store/DocumentsStore";
import AppComponent from "./shared/components/App/App";

import "./shared/styles/index.css";

const apiUrlBase = import.meta.env.VITE_API_URL_BASE;

const app = new AppComponent({
  documentsService: new DocumentsService(
    new FetchDocumentsClient(apiUrlBase),
    new DocumentsStore(),
  ),
});

const rootElement = document.body;
rootElement.prepend(app.getElement());
