import type { NewDocumentData } from "@documents/domain/types";
import ButtonComponent from "@shared/presentation/components/Button/Button";
import Component from "@shared/presentation/components/Component";
import ListBoxComponent from "@shared/presentation/components/ListBox/ListBox";
import TextboxComponent from "@shared/presentation/components/Textbox/Textbox";

type NewDocumentFormProps = {
  onSubmit?: (data: NewDocumentData) => void;
};

class NewDocumentFormComponent extends Component<NewDocumentFormProps> {
  private isFormValid: boolean = false;
  private form: HTMLFormElement | null = null;
  private contributors: string[] = [];
  private attachments: string[] = [];

  protected render(): Element {
    this.form = this.createForm();

    this.form.appendChild(this.createTextbox("name", "Name:"));
    this.form.appendChild(this.createTextbox("version", "Version:"));
    this.form.appendChild(
      this.createListBox(
        "contributors",
        "Contributors (separated by commas):",
        (values: string[]) => {
          this.contributors = values;
        },
      ),
    );
    this.form.appendChild(
      this.createListBox(
        "attachments",
        "Attachments (separated by commas):",
        (values: string[]) => {
          this.attachments = values;
        },
      ),
    );
    this.form.appendChild(this.createSubmitButton());

    this.form.addEventListener("submit", (event) => {
      event.preventDefault();

      this.validateFormDataIStronglyWishThisValidationToBeAbstractedAndInjectedIntoThisFormClassPleaseForgiveThisPoorAndHumbleDeveloper();

      if (!this.isFormValid) {
        return;
      }

      if (this.props.onSubmit) {
        const formData = new FormData(this.form!);

        this.props.onSubmit(this.mapFormDataToNewDocumentData(formData));
      }
    });

    return this.form;
  }

  private validateFormDataIStronglyWishThisValidationToBeAbstractedAndInjectedIntoThisFormClassPleaseForgiveThisPoorAndHumbleDeveloper(): void {
    if (!this.form) {
      return;
    }

    const formData = new FormData(this.form);
    const name = formData.get("name");
    const version = formData.get("version");
    this.isFormValid = true;

    const nameField = this.form.querySelector("#name") as HTMLInputElement;

    if (typeof name !== "string" || name.trim() === "") {
      this.isFormValid = false;
      this.showFieldError(nameField, "Please provide the document name.");
    } else {
      this.clearFieldError(nameField);
    }

    const versionField = this.form.querySelector(
      "#version",
    ) as HTMLInputElement;

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
      className: "form__control",
    });
    return textbox.getElement();
  }

  private createListBox(
    id: string,
    label: string,
    onChange: (values: string[]) => void,
  ) {
    const listBox = new ListBoxComponent({
      id,
      label,
      required: true,
      onChange,
    });

    return listBox.getElement();
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
      contributors: this.contributors,
      attachments: this.attachments,
    };
  }
}

export default NewDocumentFormComponent;
