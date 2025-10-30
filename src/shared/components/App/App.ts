import DocumentsListComponent from "../../../documents/components/DocumentsList/DocumentsList";
import { documentsServiceContext } from "../../../documents/context/DocumentsContext";
import Component from "../Component";
import HeadingComponent from "../Heading/Heading";
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
    const container = document.createElement("div");
    container.classList.add(styles.appContainer);

    const appTitle = new HeadingComponent({
      level: 1,
      text: "Documents",
      className: styles.appTitle,
    });

    const mainHeader = new MainHeaderComponent({
      children: appTitle.getElement(),
    });
    container.appendChild(mainHeader.getElement());

    const main = document.createElement("main");

    const documentsList = new DocumentsListComponent({});

    main.appendChild(documentsList.getElement());

    container.appendChild(main);

    return container;
  }
}

export default AppComponent;
