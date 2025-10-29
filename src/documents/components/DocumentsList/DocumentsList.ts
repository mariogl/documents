import Component from "../../../components/Component";
import type { DocumentViewModel } from "../../viewModel/types";
import type { LayoutType } from "../DocumentItem/types";
import DocumentsComponent from "../Documents/Documents";

type DocumentsListComponentProps = {
  documents: DocumentViewModel[];
};

class DocumentsListComponent extends Component<DocumentsListComponentProps> {
  private layoutType: LayoutType = "list";

  render(): HTMLElement {
    const container = document.createElement("div");

    const documentsList = new DocumentsComponent({
      documents: this.props.documents,
      layoutType: this.layoutType,
    });

    container.appendChild(documentsList.getElement());

    return container;
  }
}

export default DocumentsListComponent;
