import Component from "../Component";

import styles from "./Textbox.module.css";

type TextboxComponentProps = Partial<HTMLInputElement> & {
  label: string;
  id: string;
};

class TextboxComponent extends Component<TextboxComponentProps> {
  protected render(): Element {
    const { label, id, className, ...restProps } = this.props;

    const container = this.createContainer();

    container.appendChild(this.createLabel(id, label));

    const input = this.createInput(id);

    const baseClassName = styles.textbox;
    const finalClassName = className
      ? `${baseClassName} ${className}`
      : baseClassName;

    Object.assign(input, restProps, { className: finalClassName });

    container.appendChild(input);

    const errorMessage = this.createErrorMessage();
    container.appendChild(errorMessage);

    return container;
  }

  private createContainer() {
    const container = document.createElement("div");
    container.className = "form__group form__group--vertical";
    return container;
  }

  private createLabel(id: string, labelText: string) {
    const label = document.createElement("label");
    label.className = "form__label";
    label.textContent = labelText;
    label.htmlFor = id;
    return label;
  }

  private createInput(id: string) {
    const input = document.createElement("input");
    input.id = id;
    input.name = id;
    return input;
  }

  private createErrorMessage() {
    const errorMessage = document.createElement("span");
    errorMessage.className = "form__error";
    errorMessage.id = `${this.props.id}-error`;
    errorMessage.role = "alert";

    return errorMessage;
  }
}

export default TextboxComponent;
