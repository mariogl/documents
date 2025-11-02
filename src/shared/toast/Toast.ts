import Component from "@shared/components/Component";
import IconComponent from "@shared/components/Icon/Icon";
import IconButtonComponent from "@shared/components/IconButton/IconButton";

import styles from "./Toast.module.css";

type ToastComponentProps = {
  message: string;
  type: "success" | "error";
  onClose: () => void;
};

class ToastComponent extends Component<ToastComponentProps> {
  protected render(): Element {
    const toast = document.createElement("div");
    toast.className = `${styles.toast} ${styles[`toast--${this.props.type}`]}`;
    toast.textContent = this.props.message;
    toast.role = "alert";
    toast.setAttribute("aria-live", "assertive");
    toast.tabIndex = -1;

    const icon = new IconComponent({ name: this.props.type });
    toast.prepend(icon.getElement());

    const closeButton = new IconButtonComponent({
      icon: new IconComponent({ name: "close" }),
      text: "Close",
      className: styles.toast__closeButton,
      onClick: () => {
        this.props.onClose();
      },
    });

    toast.appendChild(closeButton.getElement());

    return toast;
  }
}

export default ToastComponent;
