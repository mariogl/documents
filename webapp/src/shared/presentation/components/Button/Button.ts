import Component from "../Component";

import styles from "./Button.module.css";

type ButtonComponentProps = Partial<HTMLButtonElement> & {
  text: string;
  size: "auto" | "full";
};

class ButtonComponent extends Component<ButtonComponentProps> {
  protected render(): Element {
    const button = document.createElement("button");

    const { className, text, size, ...restProps } = this.props;

    const baseClassName = `${styles.button} ${styles[`button--${size}`]}`;
    const finalClassName = className
      ? `${baseClassName} ${className}`
      : baseClassName;

    Object.assign(button, restProps, {
      textContent: text,
      className: finalClassName,
    });

    return button;
  }
}

export default ButtonComponent;
