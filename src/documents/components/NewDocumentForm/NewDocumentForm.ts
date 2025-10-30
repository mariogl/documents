import Component from "../../../shared/components/Component";
import TextboxComponent from "../../../shared/components/Textbox/Textbox";

import styles from "./NewDocumentForm.module.css";

class NewDocumentFormComponent extends Component {
  protected render(): Element {
    const form = this.createForm();
    form.appendChild(this.createTextbox());

    return form;
  }

  private createForm() {
    const form = document.createElement("form");
    form.className = styles.form;
    return form;
  }

  private createTextbox() {
    const textbox = new TextboxComponent({
      id: "name",
      label: "Document Name:",
      type: "text",
      required: true,
    });
    return textbox.getElement();
  }
}

export default NewDocumentFormComponent;
