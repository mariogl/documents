import Component from "../../../shared/components/Component";
import type { ComponentProps } from "../../../shared/components/types";
import { MOBILE_BREAKPOINT } from "../../../shared/config/config";
import subscribeToMediaQuery from "../../../shared/mediaQuery/mediaQuery";
import type { DocumentViewModel } from "../../viewModel/types";
import type { LayoutType } from "../DocumentItem/types";
import DocumentsComponent from "../Documents/Documents";
import DocumentsLayoutModeComponent from "../DocumentsLayoutMode/DocumentsLayoutMode";
import DocumentsSortingComponent from "../DocumentsSorting/DocumentsSorting";

import styles from "./DocumentsList.module.css";

type DocumentsListComponentProps = {
  documents: DocumentViewModel[];
};

class DocumentsListComponent extends Component<DocumentsListComponentProps> {
  private layoutType: LayoutType = "list";
  private documentsComponent: DocumentsComponent | null = null;
  private isMobile = window.innerWidth <= MOBILE_BREAKPOINT;

  constructor(props: ComponentProps<DocumentsListComponentProps>) {
    super(props);

    subscribeToMediaQuery(MOBILE_BREAKPOINT, (isMobile) => {
      this.isMobile = isMobile;

      this.setLayoutType(isMobile ? "grid" : "list");
    });
  }

  protected render(): Element {
    const container = document.createElement("section");
    container.className = styles.documentsList;

    const header = document.createElement("header");
    header.className = styles.documentsList__header;

    const sortingComponent = new DocumentsSortingComponent({
      selectedSortBy: "name",
      onSortChange: (_sortBy) => {},
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

    this.documentsComponent = new DocumentsComponent({
      documents: this.props.documents,
      layoutType: this.layoutType,
    });

    container.appendChild(this.documentsComponent.getElement());

    return container;
  }

  private setLayoutType = (layoutType: LayoutType) => {
    this.layoutType = layoutType;

    const updatedElement = this.render();
    this.setElement(updatedElement);
  };
}

export default DocumentsListComponent;
