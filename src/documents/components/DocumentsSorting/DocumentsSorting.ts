import Component from "../../../shared/components/Component";
import DropdownComponent from "../../../shared/components/Dropdown/Dropdown";
import { documentsServiceContext } from "../../context/DocumentsContext";
import type DocumentsService from "../../services/DocumentsService";
import type { DocumentViewModel } from "../../viewModel/types";

import styles from "./DocumentsSorting.module.css";

export type DocumentSortableProperties = keyof Pick<
  DocumentViewModel,
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
      { value: "createdAt", label: "Created At" },
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
