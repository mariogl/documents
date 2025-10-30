import Component from "../../../shared/components/Component";
import DropdownComponent from "../../../shared/components/Dropdown/Dropdown";
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
  documentsService: DocumentsService;
  onSortChange: (sortBy: DocumentSortableProperties) => void;
};

class DocumentsSortingComponent extends Component<DocumentsSortingProps> {
  private sortingOptions: SortingOptions;

  constructor(props: DocumentsSortingProps) {
    super(props);

    this.sortingOptions = [
      { value: "name", label: "Name" },
      { value: "version", label: "Version" },
      { value: "createdAt", label: "Created At" },
    ];
  }

  protected render(): Element {
    const container = document.createElement("form");
    container.className = styles.sort;

    const dropdown = new DropdownComponent<DocumentSortableProperties>({
      label: "Sort by:",
      id: "sortBy",
      options: this.sortingOptions,
      selectedValue: this.props.documentsService.getSortBy(),
      onChange: this.handleSortChange,
    });

    container.appendChild(dropdown.getElement());

    return container;
  }

  private handleSortChange = (sortBy: DocumentSortableProperties) => {
    this.props.documentsService.setSortBy(sortBy);
    this.props.onSortChange(sortBy);
  };
}

export default DocumentsSortingComponent;
