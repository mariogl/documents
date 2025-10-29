import Component from "../../../components/Component";
import HeadingComponent from "../../../components/Heading/Heading";
import type { DocumentViewModel } from "../../viewModel/types";
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

    this.props.documents.forEach(
      ({ name, contributors, attachments, version }) => {
        const row = document.createElement("tr");
        row.className = styles.documents__row;

        const nameCell = document.createElement("td");
        nameCell.className = styles.documents__cell;
        const documentNameHeading = new HeadingComponent({
          level: 2,
          text: name,
          className: styles.documents__name,
        });
        nameCell.appendChild(documentNameHeading.getElement());
        const documentVersion = document.createElement("span");
        documentVersion.textContent = `Version: ${version}`;
        nameCell.appendChild(documentVersion);
        row.appendChild(nameCell);

        const contributorsCell = document.createElement("td");
        contributorsCell.className = styles.documents__cell;
        const contributorsList = document.createElement("ul");
        contributorsList.className = styles.documents__list;
        contributors.forEach((contributor) => {
          const listItem = document.createElement("li");
          listItem.textContent = contributor;
          contributorsList.appendChild(listItem);
        });
        contributorsCell.appendChild(contributorsList);
        row.appendChild(contributorsCell);

        const attachmentsCell = document.createElement("td");
        attachmentsCell.className = styles.documents__cell;
        const attachmentsList = document.createElement("ul");
        attachmentsList.className = styles.documents__list;
        attachments.forEach((attachment) => {
          const listItem = document.createElement("li");
          listItem.textContent = attachment;
          attachmentsList.appendChild(listItem);
        });
        attachmentsCell.appendChild(attachmentsList);
        row.appendChild(attachmentsCell);

        tbody.appendChild(row);
      },
    );

    container.appendChild(tbody);

    return container;
  }
}

export default DocumentsListComponent;
