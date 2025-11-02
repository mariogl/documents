import Component from "@shared/presentation/components/Component";
import IconComponent from "@shared/presentation/components/Icon/Icon";
import IconButtonComponent from "@shared/presentation/components/IconButton/IconButton";

import type { LayoutType } from "../DocumentItem/types";

import styles from "./DocumentsLayoutMode.module.css";

type DocumentsLayoutModeComponentProps = {
  layoutType: LayoutType;
  onLayoutChange: (layoutType: LayoutType) => void;
};

class DocumentsLayoutModeComponent extends Component<DocumentsLayoutModeComponentProps> {
  protected render(): Element {
    const container = this.createContainer();

    container.appendChild(this.createListButton());
    container.appendChild(this.createGridButton());

    return container;
  }

  private createGridButton() {
    const button = new IconButtonComponent({
      icon: new IconComponent({ name: "grid" }),
      text: "View as grid",
      role: "radio",
      isChecked: this.props.layoutType === "grid",
      onClick: () => this.props.onLayoutChange("grid"),
    });

    return button.getElement();
  }

  private createListButton() {
    const button = new IconButtonComponent({
      icon: new IconComponent({ name: "list" }),
      text: "View as list",
      role: "radio",
      isChecked: this.props.layoutType === "list",
      onClick: () => this.props.onLayoutChange("list"),
    });

    return button.getElement();
  }

  private createContainer() {
    const container = document.createElement("div");
    container.className = styles.layoutModeButtons;
    return container;
  }
}

export default DocumentsLayoutModeComponent;
