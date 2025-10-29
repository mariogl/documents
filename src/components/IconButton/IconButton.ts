import Component from "../Component";
import type IconComponent from "../Icon/Icon";

import styles from "./IconButton.module.css";

type IconButtonProps = {
  icon: IconComponent;
  text: string;
  onClick: () => void;
};

class IconButtonComponent extends Component<IconButtonProps> {
  protected render(): Element {
    const button = document.createElement("button");
    button.className = styles.iconButton;

    button.setAttribute("aria-label", this.props.text);

    button.appendChild(this.props.icon.getElement());
    button.addEventListener("click", this.props.onClick);

    return button;
  }
}

export default IconButtonComponent;
