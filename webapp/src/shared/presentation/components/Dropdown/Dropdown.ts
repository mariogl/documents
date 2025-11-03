import Component from "../Component";

import styles from "./Dropdown.module.css";

type Option<OptionValue extends string> = {
  value: OptionValue;
  label: string;
};

type DropdownComponentProps<OptionValue extends string> = {
  label: string;
  id: string;
  options: Option<OptionValue>[];
  selectedValue: OptionValue;
  onChange: (value: OptionValue) => void;
};

class DropdownComponent<OptionValue extends string> extends Component<
  DropdownComponentProps<OptionValue>
> {
  protected render(): Element {
    const container = this.createContainer();

    container.appendChild(this.createLabel());
    container.appendChild(this.createSelect());

    return container;
  }

  private createContainer() {
    const container = document.createElement("div");
    container.className = "form__group";
    return container;
  }

  private createLabel() {
    const label = document.createElement("label");
    label.textContent = this.props.label;
    label.htmlFor = this.props.id;

    return label;
  }

  private createSelect() {
    const select = document.createElement("select");
    select.className = styles.dropdown;
    select.id = this.props.id;
    select.name = this.props.id;

    this.props.options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option.value;
      optionElement.textContent = option.label;

      if (this.props.selectedValue === option.value) {
        optionElement.selected = true;
      }

      select.appendChild(optionElement);
    });

    select.addEventListener("change", (event) => {
      const target = event.target as HTMLSelectElement;
      this.props.onChange(target.value as OptionValue);
    });

    return select;
  }
}

export default DropdownComponent;
