import DocumentsListComponent from "../../../documents/components/DocumentsList/DocumentsList";
import { documentsServiceContext } from "../../../documents/context/documentsServiceContext";
import Component from "../Component";
import HeadingComponent from "../Heading/Heading";
import LoadingComponent from "../Loading/Loading";
import MainHeaderComponent from "../MainHeader/MainHeader";
import type { ComponentProps } from "../types";

import styles from "./App.module.css";

class AppComponent extends Component {
  constructor(props: ComponentProps) {
    super(props);

    const documentsService = documentsServiceContext.consume();
    documentsService.subscribe(() => {
      this.rerender();
    });

    documentsService.loadDocuments();
  }

  protected render(): Element {
    const container = this.createContainer();

    container.appendChild(this.createMainHeader());

    const main = this.createMain();

    main.appendChild(this.createDocumentsList());

    container.appendChild(main);

    container.appendChild(this.createLoading());

    return container;
  }

  private createContainer() {
    const container = document.createElement("div");
    container.classList.add(styles.appContainer);
    return container;
  }

  private createMainHeader() {
    const appTitle = new HeadingComponent({
      level: 1,
      text: "Documents",
      className: styles.appTitle,
    });

    const mainHeader = new MainHeaderComponent({
      children: appTitle.getElement(),
    });

    return mainHeader.getElement();
  }

  private createMain() {
    return document.createElement("main");
  }

  private createDocumentsList() {
    return new DocumentsListComponent({}).getElement();
  }

  private createLoading() {
    return new LoadingComponent({}).getElement();
  }
}

export default AppComponent;
