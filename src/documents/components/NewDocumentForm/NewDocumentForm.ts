import ButtonComponent from "../../../shared/components/Button/Button";
import Component from "../../../shared/components/Component";
import TextboxComponent from "../../../shared/components/Textbox/Textbox";

import styles from "./NewDocumentForm.module.css";

class NewDocumentFormComponent extends Component {
  protected render(): Element {
    const form = this.createForm();

    form.appendChild(this.createTextbox("name", "Name:"));
    form.appendChild(this.createTextbox("version", "Version:"));
    form.appendChild(this.createSubmitButton());

    return form;
  }

  private createForm() {
    const form = document.createElement("form");
    form.className = styles.form;
    return form;
  }

  private createTextbox(id: string, label: string) {
    const textbox = new TextboxComponent({
      id,
      label,
      type: "text",
      required: true,
    });
    return textbox.getElement();
  }

  private createSubmitButton() {
    const button = new ButtonComponent({
      text: "Create Document",
      size: "auto",
      type: "submit",
    });
    return button.getElement();
  }
}

export default NewDocumentFormComponent;
