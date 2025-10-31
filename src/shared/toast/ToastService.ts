import ToastComponent from "./Toast";

import styles from "./Toast.module.css";

class ToastService {
  private timer!: number;
  private defaultMillisecondsToShow = 3000;

  constructor() {}

  show({
    message,
    type,
    duration = this.defaultMillisecondsToShow,
  }: {
    message: string;
    type: "success" | "error";
    duration?: number;
  }) {
    const toast = new ToastComponent({
      message,
      type,
      onClose: () => this.hide(toast),
    }).getElement();

    document.body.appendChild(toast);

    setTimeout(() => {
      (toast as HTMLDivElement).focus();
    }, 0);

    this.timer = setTimeout(() => {
      this.hide(toast);
    }, duration);
  }

  hide(toast: Element) {
    toast.classList.add(styles["toast--hiding"]);
    toast.addEventListener(
      "transitionend",
      () => {
        toast.remove();
        clearTimeout(this.timer);
      },
      { once: true },
    );
  }
}

export const toast = new ToastService();
