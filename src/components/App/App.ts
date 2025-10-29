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
  render(): HTMLElement {
    const container = document.createElement("div");
    container.classList.add(styles.appContainer);

    const appTitle = new HeadingComponent({
      level: 1,
      text: "Documents",
      className: styles.appTitle,
    });

    const mainHeader = new MainHeaderComponent({ children: appTitle.render() });
    const documentsList = new DocumentsList({
      documents,
    });

    container.innerHTML = `
      ${mainHeader.render().outerHTML}
      <main>
        ${documentsList.render().outerHTML}
      </main>
    `;

    return container;
  }
}

export default AppComponent;
