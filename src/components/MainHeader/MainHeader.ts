import Component from "../Component";

import styles from "./MainHeader.module.css";

class MainHeaderComponent extends Component {
  protected render(): HTMLElement {
    const header = document.createElement("header");

    const baseClassName = styles.mainHeader;

    header.className = this.props.className
      ? `${baseClassName} ${this.props.className}`
      : baseClassName;

    if (!this.props.children) {
      return header;
    }

    if (Array.isArray(this.props.children)) {
      header.append(...this.props.children);
    } else {
      header.append(this.props.children);
    }

    return header;
  }
}

export default MainHeaderComponent;
