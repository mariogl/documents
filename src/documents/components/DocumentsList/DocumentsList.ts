import Component from "../../../shared/components/Component";
import type { ComponentProps } from "../../../shared/components/types";
import { MOBILE_BREAKPOINT } from "../../../shared/config/config";
import subscribeToMediaQuery from "../../../shared/mediaQuery/mediaQuery";
import { documentsServiceContext } from "../../context/DocumentsContext";
import type DocumentsService from "../../services/DocumentsService";
import type { DocumentViewModel } from "../../viewModel/types";
import type { LayoutType } from "../DocumentItem/types";
import DocumentsComponent from "../Documents/Documents";
import DocumentsLayoutModeComponent from "../DocumentsLayoutMode/DocumentsLayoutMode";
import DocumentsSortingComponent from "../DocumentsSorting/DocumentsSorting";

import styles from "./DocumentsList.module.css";

class DocumentsListComponent extends Component {
  private documents: DocumentViewModel[] = [];
  private documentsService: DocumentsService;
  private layoutType: LayoutType = "list";
  private isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

  constructor(props: ComponentProps) {
    super(props);

    this.documentsService = documentsServiceContext.consume();

    subscribeToMediaQuery(MOBILE_BREAKPOINT, (isMobile) => {
      this.isMobile = isMobile;

      this.setLayoutType(isMobile ? "grid" : "list");
    });
  }

  protected render(): Element {
    this.documents = this.documentsService.getDocuments();

    const container = document.createElement("section");
    container.className = styles.documentsList;

    const header = document.createElement("header");
    header.className = styles.documentsList__header;

    const sortingComponent = new DocumentsSortingComponent({
      onSortChange: this.onSortChange,
    });
    header.appendChild(sortingComponent.getElement());

    const layoutModeButtons = new DocumentsLayoutModeComponent({
      layoutType: this.layoutType,
      onLayoutChange: this.setLayoutType,
    });

    if (!this.isMobile) {
      header.appendChild(layoutModeButtons.getElement());
    }

    container.appendChild(header);

    const documentsComponent = new DocumentsComponent({
      documents: this.documents,
      layoutType: this.layoutType,
    });

    container.appendChild(documentsComponent.getElement());

    return container;
  }

  private setLayoutType = (layoutType: LayoutType) => {
    this.layoutType = layoutType;

    this.rerender();
  };

  private onSortChange = () => {
    this.documents = this.documentsService.getDocuments();

    this.rerender();
  };
}

export default DocumentsListComponent;
