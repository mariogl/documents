import Component from "../../../components/Component";
import type { DocumentViewModel } from "../../viewModel/types";
import type { LayoutType } from "../DocumentItem/types";
import DocumentsComponent from "../Documents/Documents";
import DocumentsLayoutModeComponent from "../DocumentsLayoutMode/DocumentsLayoutMode";

import styles from "./DocumentsList.module.css";

type DocumentsListComponentProps = {
  documents: DocumentViewModel[];
};

class DocumentsListComponent extends Component<DocumentsListComponentProps> {
  private layoutType: LayoutType = "list";
  private documentsComponent: DocumentsComponent | null = null;
  private readonly breakpoint = 590;
  private isMobile = window.innerWidth <= this.breakpoint;
  private mediaQuery: MediaQueryList | null = null;

  protected render(): Element {
    if (!this.mediaQuery) {
      this.initializeResponsiveBehavior();
    }

    const container = document.createElement("section");
    container.className = styles.documentsList;

    const header = document.createElement("header");
    header.className = styles.documentsList__header;

    const layoutModeButtons = new DocumentsLayoutModeComponent({
      layoutType: this.layoutType,
      onLayoutChange: this.setLayoutType,
    });

    if (!this.isMobile) {
      header.appendChild(layoutModeButtons.getElement());
    }

    container.appendChild(header);

    this.documentsComponent = new DocumentsComponent({
      documents: this.props.documents,
      layoutType: this.layoutType,
    });

    container.appendChild(this.documentsComponent.getElement());

    return container;
  }

  private initializeResponsiveBehavior(): void {
    if (this.isMobile) {
      this.layoutType = "grid";
    }

    this.mediaQuery = window.matchMedia(`(max-width: ${this.breakpoint}px)`);
    this.mediaQuery.addEventListener("change", this.handleMediaChange);
  }

  private handleMediaChange = (event: MediaQueryListEvent) => {
    if (event.matches) {
      this.isMobile = true;
      this.setLayoutType("grid");
    } else {
      this.isMobile = false;
      this.setLayoutType("list");
    }
  };

  private cleanupMediaQuery(): void {
    if (this.mediaQuery) {
      this.mediaQuery.removeEventListener("change", this.handleMediaChange);
      this.mediaQuery = null;
    }
  }

  private setLayoutType = (layoutType: LayoutType) => {
    this.layoutType = layoutType;

    this.cleanupMediaQuery();

    const updatedElement = this.render();
    this.setElement(updatedElement);
  };
}

export default DocumentsListComponent;
