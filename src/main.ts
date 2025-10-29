import AppComponent from "./components/App/App";
import FetchDocumentsClient from "./documents/client/FetchDocumentsClient";

import "./styles/index.css";

const rootElement = document.body;

const app = new AppComponent({
  documentsClient: new FetchDocumentsClient(),
});

rootElement.prepend(app.getElement());
