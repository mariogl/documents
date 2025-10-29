import Component from "../../../components/Component";
import IconComponent from "../../../components/Icon/Icon";
import IconButtonComponent from "../../../components/IconButton/IconButton";
import type { DocumentViewModel } from "../../viewModel/types";
import type { LayoutType } from "../DocumentItem/types";
import DocumentsComponent from "../Documents/Documents";

import styles from "./DocumentsList.module.css";

type DocumentsListComponentProps = {
  documents: DocumentViewModel[];
};

class DocumentsListComponent extends Component<DocumentsListComponentProps> {
  private layoutType: LayoutType = "list";
  private documentsComponent: DocumentsComponent | null = null;

  protected render(): Element {
    const container = document.createElement("section");
    container.className = styles.documentsList;

    const header = document.createElement("header");
    header.className = styles.documentsList__header;

    const gridButton = new IconButtonComponent({
      icon: new IconComponent({ name: "grid" }),
      text: "View as grid",
      role: "radio",
      isChecked: this.layoutType === "grid",
      onClick: () => this.setLayoutType("grid"),
    });
    const listButton = new IconButtonComponent({
      icon: new IconComponent({ name: "list" }),
      text: "View as list",
      role: "radio",
      isChecked: this.layoutType === "list",
      onClick: () => this.setLayoutType("list"),
    });

    const layoutModeButtons = document.createElement("div");
    layoutModeButtons.className = styles.documentsList__layoutModeButtons;
    layoutModeButtons.appendChild(listButton.getElement());
    layoutModeButtons.appendChild(gridButton.getElement());
    header.appendChild(layoutModeButtons);

    container.appendChild(header);

    this.documentsComponent = new DocumentsComponent({
      documents: this.props.documents,
      layoutType: this.layoutType,
    });

    container.appendChild(this.documentsComponent.getElement());

    return container;
  }

  private setLayoutType = (layoutType: LayoutType) => {
    this.layoutType = layoutType;

    const updatedElement = this.render();
    this.setElement(updatedElement);
  };
}

export default DocumentsListComponent;
