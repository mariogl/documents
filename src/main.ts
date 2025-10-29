import "./styles/index.css";

import AppComponent from "./components/App/App";
import FakeDocumentsClient from "./documents/client/FakeDocumentsClient";

const rootElement = document.body;

const app = new AppComponent({
  documentsClient: new FakeDocumentsClient(),
});

rootElement.prepend(app.getElement());
