import Component from "../../../shared/components/Component";
import IconComponent from "../../../shared/components/Icon/Icon";
import IconButtonComponent from "../../../shared/components/IconButton/IconButton";
import type { LayoutType } from "../DocumentItem/types";

import styles from "./DocumentsLayoutMode.module.css";

type DocumentsLayoutModeComponentProps = {
  layoutType: LayoutType;
  onLayoutChange: (layoutType: LayoutType) => void;
};

class DocumentsLayoutModeComponent extends Component<DocumentsLayoutModeComponentProps> {
  protected render(): Element {
    const gridButton = new IconButtonComponent({
      icon: new IconComponent({ name: "grid" }),
      text: "View as grid",
      role: "radio",
      isChecked: this.props.layoutType === "grid",
      onClick: () => this.props.onLayoutChange("grid"),
    });
    const listButton = new IconButtonComponent({
      icon: new IconComponent({ name: "list" }),
      text: "View as list",
      role: "radio",
      isChecked: this.props.layoutType === "list",
      onClick: () => this.props.onLayoutChange("list"),
    });

    const container = document.createElement("div");
    container.className = styles.layoutModeButtons;

    container.appendChild(listButton.getElement());
    container.appendChild(gridButton.getElement());

    return container;
  }
}

export default DocumentsLayoutModeComponent;
