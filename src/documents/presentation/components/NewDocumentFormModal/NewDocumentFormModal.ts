import { documentsServiceContext } from "@documents/application/context/documentsServiceContext";
import type DocumentsService from "@documents/application/services/DocumentsService";
import type { NewDocumentData } from "@documents/domain/types";
import Component from "@shared/presentation/components/Component";
import HeadingComponent from "@shared/presentation/components/Heading/Heading";
import IconComponent from "@shared/presentation/components/Icon/Icon";
import IconButtonComponent from "@shared/presentation/components/IconButton/IconButton";
import { toast } from "@shared/presentation/components/Toast/ToastService";
import type { ComponentProps } from "@shared/presentation/components/types";

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
    try {
      await this.documentsService.addDocument(data);
      dialog.close();
      toast.show({
        type: "success",
        message: "Document added successfully",
      });
    } catch {
      toast.show({
        type: "error",
        message: "Failed to add document. Please try again.",
      });
    }
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
