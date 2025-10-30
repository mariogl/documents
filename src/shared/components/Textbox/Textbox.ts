import Component from "../Component";

import styles from "./Textbox.module.css";

type TextboxProps = Partial<HTMLInputElement> & {
  label: string;
  id: string;
};

class TextboxComponent extends Component<TextboxProps> {
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

    return container;
  }

  private createContainer() {
    const container = document.createElement("div");
    container.className = "form__group form__group--vertical";
    return container;
  }

  private createLabel(id: string, labelText: string) {
    const label = document.createElement("label");
    label.textContent = labelText;
    label.htmlFor = id;
    return label;
  }

  private createInput(id: string) {
    const input = document.createElement("input");
    input.id = id;
    return input;
  }
}

export default TextboxComponent;
