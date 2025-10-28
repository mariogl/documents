import "./styles/index.css";

import AppComponent from "./components/App/App";

const rootElement = document.body;

const app = new AppComponent();

rootElement.prepend(app.render());
