import Component from "../../../shared/components/Component";
import HeadingComponent from "../../../shared/components/Heading/Heading";
import IconComponent from "../../../shared/components/Icon/Icon";
import IconButtonComponent from "../../../shared/components/IconButton/IconButton";
import NewDocumentFormComponent from "../NewDocumentForm/NewDocumentForm";

import styles from "./NewDocumentFormModal.module.css";

class NewDocumentFormModalComponent extends Component {
  protected render(): Element {
    const dialog = document.createElement("dialog");
    dialog.className = styles.modal;

    const container = this.createContainer();

    container.appendChild(this.createTitle());
    container.appendChild(this.createForm());
    container.appendChild(this.createCloseButton(dialog));

    dialog.appendChild(container);

    this.closeOnOutsideClick(dialog);

    return dialog;
  }

  private createContainer() {
    const container = document.createElement("div");
    container.className = styles.modal__container;
    return container;
  }

  private createTitle() {
    const formTitle = new HeadingComponent({
      level: 2,
      text: "Add New Document",
      className: styles.modal__title,
    });

    return formTitle.getElement();
  }

  private createCloseButton(dialog: HTMLDialogElement) {
    const closeButton = new IconButtonComponent({
      icon: new IconComponent({ name: "close" }),
      text: "Close",
      className: styles.modal__closeButton,
      onClick: () => {
        dialog.close();
      },
    });

    return closeButton.getElement();
  }

  private closeOnOutsideClick(element: HTMLDialogElement) {
    element.addEventListener("click", (event) => {
      if (event.target === this.element) {
        element.close();
      }
    });
  }

  private createForm() {
    const newDocumentForm = new NewDocumentFormComponent({});
    return newDocumentForm.getElement();
  }
}

export default NewDocumentFormModalComponent;
