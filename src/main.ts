import AppComponent from "./components/App/App";
import FetchDocumentsClient from "./documents/client/FetchDocumentsClient";

import "./styles/index.css";

const apiUrlBase = import.meta.env.VITE_API_URL_BASE;

const app = new AppComponent({
  documentsClient: new FetchDocumentsClient(apiUrlBase),
});

const rootElement = document.body;
rootElement.prepend(app.getElement());
