import { documentsServiceContext } from "@documents/application/context/documentsServiceContext";
import type DocumentsService from "@documents/application/services/DocumentsService";
import type { Document } from "@documents/domain/types";
import ButtonComponent from "@shared/components/Button/Button";
import Component from "@shared/components/Component";
import type { ComponentProps } from "@shared/components/types";
import { MOBILE_BREAKPOINT } from "@shared/config/config";
import subscribeToMediaQuery from "@shared/mediaQuery/mediaQuery";

import type { LayoutType } from "../DocumentItem/types";
import DocumentsComponent from "../Documents/Documents";
import DocumentsLayoutModeComponent from "../DocumentsLayoutMode/DocumentsLayoutMode";
import DocumentsSortingComponent from "../DocumentsSorting/DocumentsSorting";
import NewDocumentFormModalComponent from "../NewDocumentFormModal/NewDocumentFormModal";

import styles from "./DocumentsList.module.css";

class DocumentsListComponent extends Component {
  private documents: Document[] = [];
  private documentsService: DocumentsService;
  private layoutType: LayoutType = "list";
  private isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

  constructor(props: ComponentProps) {
    super(props);

    this.documentsService = documentsServiceContext.consume();
    this.documentsService.subscribe(() => {
      this.rerender();
    });

    subscribeToMediaQuery(MOBILE_BREAKPOINT, (isMobile) => {
      this.isMobile = isMobile;

      this.setLayoutType(isMobile ? "grid" : "list");
    });
  }

  protected render(): Element {
    this.documents = this.documentsService.getDocuments();

    const container = this.createContainer();

    if (this.documents.length === 0) {
      const noDocumentsMessage = document.createElement("p");
      noDocumentsMessage.className = styles.documentsList__noDocuments;
      noDocumentsMessage.textContent =
        "No documents available. You can add one!";
      container.appendChild(noDocumentsMessage);

      this.createNewDocumentFormAndButton(container);

      return container;
    }

    const header = this.createHeader();

    header.appendChild(this.createSortingComponent());

    if (!this.isMobile) {
      header.appendChild(this.createLayoutModeButtons());
    }

    container.appendChild(header);
    container.appendChild(this.createDocumentsComponent());

    this.createNewDocumentFormAndButton(container);

    return container;
  }

  private setLayoutType = (layoutType: LayoutType) => {
    this.layoutType = layoutType;

    this.rerender();
  };

  private onSortChange = () => {
    this.documents = this.documentsService.getDocuments();
  };

  private createContainer() {
    const container = document.createElement("section");
    container.className = styles.documentsList;
    return container;
  }

  private createHeader() {
    const header = document.createElement("header");
    header.className = styles.documentsList__header;
    return header;
  }

  private createSortingComponent() {
    const sortingComponent = new DocumentsSortingComponent({
      onSortChange: this.onSortChange,
    });
    return sortingComponent.getElement();
  }

  private createLayoutModeButtons() {
    const buttons = new DocumentsLayoutModeComponent({
      layoutType: this.layoutType,
      onLayoutChange: this.setLayoutType,
    });
    return buttons.getElement();
  }

  private createDocumentsComponent() {
    const documentsComponent = new DocumentsComponent({
      documents: this.documents,
      layoutType: this.layoutType,
    });
    return documentsComponent.getElement();
  }

  private createButtonContainer() {
    const buttonContainer = document.createElement("div");
    if (this.layoutType === "grid") {
      buttonContainer.className =
        styles["documentsList__buttonContainer--grid"];
    }
    return buttonContainer;
  }

  private createButton(modal: HTMLDialogElement) {
    const createButton = new ButtonComponent({
      text: "+ Add document",
      size: this.layoutType === "list" ? "full" : "auto",
      onclick: () => {
        modal.showModal();
      },
    });
    return createButton.getElement();
  }

  private createForm() {
    const newDocumentForm = new NewDocumentFormModalComponent({});
    return newDocumentForm.getElement();
  }

  private createNewDocumentFormAndButton(container: HTMLElement) {
    const buttonContainer = this.createButtonContainer();
    container.appendChild(buttonContainer);

    const newDocumentForm = this.createForm();
    container.appendChild(newDocumentForm);

    const newDocumentFormModal = newDocumentForm as HTMLDialogElement;

    buttonContainer.appendChild(this.createButton(newDocumentFormModal));
  }
}

export default DocumentsListComponent;
