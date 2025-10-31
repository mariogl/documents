import ButtonComponent from "../../../shared/components/Button/Button";
import Component from "../../../shared/components/Component";
import TextboxComponent from "../../../shared/components/Textbox/Textbox";
import type { NewDocumentData } from "../../types";

import styles from "./NewDocumentForm.module.css";

type NewDocumentFormProps = {
  onSubmit?: (data: NewDocumentData) => void;
};

class NewDocumentFormComponent extends Component<NewDocumentFormProps> {
  protected render(): Element {
    const form = this.createForm();

    form.appendChild(this.createTextbox("name", "Name:"));
    form.appendChild(this.createTextbox("version", "Version:"));
    form.appendChild(this.createSubmitButton());

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      if (this.props.onSubmit) {
        this.props.onSubmit(
          this.mapFormDataToNewDocumentData(new FormData(form)),
        );
      }
    });

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

  private mapFormDataToNewDocumentData(formData: FormData): NewDocumentData {
    return {
      name: formData.get("name") as string,
      version: formData.get("version") as string,
      createdAt: new Date(),
      contributors: [],
      attachments: [],
    };
  }
}

export default NewDocumentFormComponent;
