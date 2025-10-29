import Component from "../../../components/Component";
import type { DocumentViewModel } from "../../viewModel/types";
import DocumentCardComponent from "../DocumentCard/DocumentCard";
import styles from "./DocumentsGrid.module.css";

type DocumentsGridComponentProps = {
  documents: DocumentViewModel[];
};

class DocumentsGridComponent extends Component<DocumentsGridComponentProps> {
  render(): HTMLElement {
    const container = document.createElement("ul");
    container.className = styles.documents;

    this.props.documents.forEach((doc) => {
      const listItem = document.createElement("li");

      const documentCard = new DocumentCardComponent({
        document: doc,
      }).getElement();

      listItem.appendChild(documentCard);
      container.appendChild(listItem);
    });

    return container;
  }
}

export default DocumentsGridComponent;
