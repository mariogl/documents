import ButtonComponent from "../../../shared/components/Button/Button";
import Component from "../../../shared/components/Component";
import TextboxComponent from "../../../shared/components/Textbox/Textbox";
import type { NewDocumentData } from "../../types";

type NewDocumentFormProps = {
  onSubmit?: (data: NewDocumentData) => void;
};

class NewDocumentFormComponent extends Component<NewDocumentFormProps> {
  private isFormValid: boolean = false;

  protected render(): Element {
    const form = this.createForm();

    form.appendChild(this.createTextbox("name", "Name:"));
    form.appendChild(this.createTextbox("version", "Version:"));
    form.appendChild(this.createSubmitButton());

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      this.validateFormData(form);

      if (!this.isFormValid) {
        return;
      }

      if (this.props.onSubmit) {
        this.props.onSubmit(
          this.mapFormDataToNewDocumentData(new FormData(form)),
        );
      }
    });

    return form;
  }

  private validateFormData(form: HTMLFormElement): void {
    const formData = new FormData(form);
    const name = formData.get("name");
    const version = formData.get("version");
    this.isFormValid = true;

    const nameField = form.querySelector("#name") as HTMLInputElement;

    if (typeof name !== "string" || name.trim() === "") {
      this.isFormValid = false;
      this.showFieldError(nameField, "Please provide the document name.");
    } else {
      this.clearFieldError(nameField);
    }

    const versionField = form.querySelector("#version") as HTMLInputElement;

    if (typeof version !== "string" || version.trim() === "") {
      this.isFormValid = false;

      this.showFieldError(versionField, "Please provide the document version.");
    } else {
      this.clearFieldError(versionField);
    }
  }

  private showFieldError(field: HTMLElement, message: string) {
    field.classList.add("invalid");
    field.setAttribute("aria-invalid", "true");

    const errorId = `${field.id}-error`;
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = message;
    }
  }

  private clearFieldError(field: HTMLElement) {
    field.classList.remove("invalid");
    field.removeAttribute("aria-invalid");

    const errorId = `${field.id}-error`;
    const errorElement = document.getElementById(errorId);
    if (errorElement) {
      errorElement.textContent = "";
    }
  }

  private createForm() {
    const form = document.createElement("form");
    form.className = "form form--vertical";
    form.noValidate = true;
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
