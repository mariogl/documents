import Component from "../../../components/Component";
import type { DocumentViewModel } from "../../viewModel/types";
import DocumentRowComponent from "../DocumentRow/DocumentRow";
import styles from "./DocumentsList.module.css";

type DocumentsListComponentProps = {
  documents: DocumentViewModel[];
};

class DocumentsListComponent extends Component<DocumentsListComponentProps> {
  render(): HTMLElement {
    const container = document.createElement("table");
    container.className = styles.documents;

    const thead = document.createElement("thead");
    thead.className = styles.documents__head;

    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");

    const nameHeader = document.createElement("th");
    nameHeader.className = styles.documents__header;
    nameHeader.textContent = "Name";
    headerRow.appendChild(nameHeader);

    const contributorsHeader = document.createElement("th");
    contributorsHeader.className = styles.documents__header;
    contributorsHeader.textContent = "Contributors";
    headerRow.appendChild(contributorsHeader);

    const attachmentsHeader = document.createElement("th");
    attachmentsHeader.className = styles.documents__header;
    attachmentsHeader.textContent = "Attachments";
    headerRow.appendChild(attachmentsHeader);

    thead.appendChild(headerRow);
    container.appendChild(thead);

    this.props.documents.forEach((doc) => {
      const row = new DocumentRowComponent({
        document: doc,
      }).getElement();

      tbody.appendChild(row);
    });

    container.appendChild(tbody);

    return container;
  }
}

export default DocumentsListComponent;
