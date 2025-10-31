import Component from "../../../shared/components/Component";
import HeadingComponent from "../../../shared/components/Heading/Heading";
import IconComponent from "../../../shared/components/Icon/Icon";
import IconButtonComponent from "../../../shared/components/IconButton/IconButton";
import type { ComponentProps } from "../../../shared/components/types";
import { toast } from "../../../shared/toast/ToastService";
import { documentsServiceContext } from "../../context/DocumentsContext";
import type DocumentsService from "../../services/DocumentsService";
import type { NewDocumentData } from "../../types";
import NewDocumentFormComponent from "../NewDocumentForm/NewDocumentForm";

import styles from "./NewDocumentFormModal.module.css";

class NewDocumentFormModalComponent extends Component {
  private documentsService: DocumentsService;
  private dialog!: HTMLDialogElement;

  constructor(props: ComponentProps) {
    super(props);

    this.documentsService = documentsServiceContext.consume();
  }

  protected render(): Element {
    const dialog = document.createElement("dialog");
    this.dialog = dialog;
    dialog.className = styles.modal;

    const container = this.createContainer();

    container.appendChild(this.createTitle());
    container.appendChild(this.createForm());
    container.appendChild(this.createCloseButton());

    dialog.appendChild(container);

    this.closeOnOutsideClick();

    return dialog;
  }

  private async onSubmit(data: NewDocumentData, dialog: HTMLDialogElement) {
    dialog.close();
    await this.documentsService.addDocument(data);
    toast.show({
      type: "success",
      message: "Document added successfully",
    });
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

  private createCloseButton() {
    const closeButton = new IconButtonComponent({
      icon: new IconComponent({ name: "close" }),
      text: "Close",
      className: styles.modal__closeButton,
      onClick: () => {
        this.dialog.close();
      },
    });

    return closeButton.getElement();
  }

  private closeOnOutsideClick() {
    this.dialog.addEventListener("click", (event) => {
      if (event.target === this.element) {
        this.dialog.close();
      }
    });
  }

  private createForm() {
    const newDocumentForm = new NewDocumentFormComponent({
      onSubmit: (data) => this.onSubmit(data, this.dialog),
    });
    return newDocumentForm.getElement();
  }
}

export default NewDocumentFormModalComponent;
