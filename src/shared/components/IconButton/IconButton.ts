import Component from "../Component";
import type IconComponent from "../Icon/Icon";

import styles from "./IconButton.module.css";

type IconButtonProps = {
  icon: IconComponent;
  text: string;
  role?: string;
  isChecked?: boolean;
  onClick: () => void;
};

class IconButtonComponent extends Component<IconButtonProps> {
  protected render(): Element {
    const button = document.createElement("button");
    button.appendChild(this.props.icon.getElement());

    button.className = styles.iconButton;

    this.configureButtonAccessibility(button);

    button.addEventListener("click", this.props.onClick);

    return button;
  }

  private configureButtonAccessibility(button: HTMLButtonElement) {
    button.setAttribute("aria-label", this.props.text);

    if (this.props.role) {
      button.setAttribute("role", this.props.role);
    }

    if (typeof this.props.isChecked !== "undefined") {
      button.setAttribute("aria-checked", this.props.isChecked.toString());

      if (!this.props.isChecked) {
        button.classList.add(styles["iconButton--unchecked"]);
      }

      this.forceFocusOnCheck(button);
    }
  }

  private forceFocusOnCheck(button: HTMLButtonElement) {
    if (this.props.isChecked) {
      setTimeout(() => {
        button.focus();
      });
    }
  }
}

export default IconButtonComponent;
