import { documentsServiceContext } from "@documents/application/context/documentsServiceContext";
import type DocumentsService from "@documents/application/services/DocumentsService";
import type { Document } from "@documents/domain/types";
import Component from "@shared/presentation/components/Component";
import DropdownComponent from "@shared/presentation/components/Dropdown/Dropdown";

import styles from "./DocumentsSorting.module.css";

export type DocumentSortableProperties = keyof Pick<
  Document,
  "name" | "version" | "createdAt"
>;

type SortingOptions = {
  value: DocumentSortableProperties;
  label: string;
}[];

type DocumentsSortingProps = {
  onSortChange: (sortBy: DocumentSortableProperties) => void;
};

class DocumentsSortingComponent extends Component<DocumentsSortingProps> {
  private sortingOptions: SortingOptions;
  private documentsService: DocumentsService;

  constructor(props: DocumentsSortingProps) {
    super(props);

    this.documentsService = documentsServiceContext.consume();

    this.sortingOptions = [
      { value: "name", label: "Name" },
      { value: "version", label: "Version" },
      { value: "createdAt", label: "Creation Date" },
    ];
  }

  protected render(): Element {
    const container = this.createContainer();

    container.appendChild(this.createDropdown());

    return container;
  }

  private handleSortChange = (sortBy: DocumentSortableProperties) => {
    this.documentsService.setSortBy(sortBy);
    this.props.onSortChange(sortBy);
  };

  private createContainer() {
    const container = document.createElement("form");
    container.className = styles.sort;
    return container;
  }

  private createDropdown() {
    const dropdown = new DropdownComponent<DocumentSortableProperties>({
      label: "Sort by:",
      id: "sortBy",
      options: this.sortingOptions,
      selectedValue: this.documentsService.getSortBy(),
      onChange: this.handleSortChange,
    });
    return dropdown.getElement();
  }
}

export default DocumentsSortingComponent;
