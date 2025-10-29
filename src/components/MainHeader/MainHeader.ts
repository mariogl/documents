import Component from "../Component";
import styles from "./MainHeader.module.css";

class MainHeaderComponent extends Component {
  protected render(): void {
    const header = document.createElement("header");

    const baseClassName = styles.mainHeader;

    header.className = this.props.className
      ? `${baseClassName} ${this.props.className}`
      : baseClassName;

    if (!this.props.children) {
      this.setElement(header);
      return;
    }

    if (Array.isArray(this.props.children)) {
      header.append(...this.props.children);
    } else {
      header.append(this.props.children);
    }

    this.setElement(header);
  }
}

export default MainHeaderComponent;
