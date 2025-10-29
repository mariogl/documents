import DocumentsList from "../../documents/components/DocumentsList/DocumentsList";
import type { DocumentViewModel } from "../../documents/viewModel/types";
import Component from "../Component";
import HeadingComponent from "../Heading/Heading";
import MainHeaderComponent from "../MainHeader/MainHeader";
import styles from "./App.module.css";

const documents: DocumentViewModel[] = [
  {
    id: "1",
    name: "Project Plan",
    contributors: ["Alice Smith", "Bob Johnson"],
    attachments: ["Light Lager", "Light Hybrid Beer", "Pilsner"],
  },
  {
    id: "2",
    name: "Design Document",
    contributors: ["Charlie Brown", "Dana White"],
    attachments: ["Stout", "Porter"],
  },
];
class AppComponent extends Component {
  protected render(): void {
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
    const documentsList = new DocumentsList({
      documents,
    });

    container.appendChild(mainHeader.getElement());

    const main = document.createElement("main");
    main.appendChild(documentsList.getElement());

    container.appendChild(main);

    this.setElement(container);
  }
}

export default AppComponent;
