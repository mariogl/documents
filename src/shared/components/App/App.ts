import type { DocumentsClient } from "../../../documents/client/types";
import DocumentsListComponent from "../../../documents/components/DocumentsList/DocumentsList";
import type DocumentsService from "../../../documents/services/DocumentsService";
import Component from "../Component";
import HeadingComponent from "../Heading/Heading";
import MainHeaderComponent from "../MainHeader/MainHeader";
import type { ComponentProps } from "../types";

import styles from "./App.module.css";

type AppComponentProps = {
  documentsClient: DocumentsClient;
  documentsService: DocumentsService;
};

class AppComponent extends Component<AppComponentProps> {
  constructor(props: ComponentProps<AppComponentProps>) {
    super(props);

    props.documentsService.loadDocuments().then(() => {
      this.rerender();
    });
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

    const documentsList = new DocumentsListComponent({
      documentsService: this.props.documentsService,
    });

    main.appendChild(documentsList.getElement());

    container.appendChild(main);

    return container;
  }
}

export default AppComponent;
