import Component from "../../../components/Component";
import type { DocumentViewModel } from "../../viewModel/types";
import styles from "./DocumentsGrid.module.css";

type DocumentsGridComponentProps = {
  documents: DocumentViewModel[];
};

class DocumentsGridComponent extends Component<DocumentsGridComponentProps> {
  render(): HTMLElement {
    const container = document.createElement("ul");
    container.className = styles.documents;

    this.props.documents.forEach(
      ({ name, contributors, attachments, version }) => {
        const listItem = document.createElement("li");

        const documentCard = document.createElement("article");
        documentCard.className = styles.documents__card;
        listItem.appendChild(documentCard);

        const documentHeader = document.createElement("header");
        documentHeader.className = styles.documents__header;
        documentCard.appendChild(documentHeader);

        const documentName = document.createElement("h2");
        documentName.className = styles.documents__name;
        documentName.textContent = name;
        documentHeader.appendChild(documentName);

        const documentVersion = document.createElement("span");
        documentVersion.textContent = `Version: ${version}`;
        documentHeader.appendChild(documentVersion);

        const contributorsSection = document.createElement("section");
        documentCard.appendChild(contributorsSection);

        const contributorsList = document.createElement("ul");
        contributorsList.className = styles.documents__list;
        contributors.forEach((contributor) => {
          const contributorItem = document.createElement("li");
          contributorItem.textContent = contributor;
          contributorsList.appendChild(contributorItem);
        });
        contributorsSection.appendChild(contributorsList);

        const attachmentsList = document.createElement("ul");
        attachmentsList.className = styles.documents__list;
        attachments.forEach((attachment) => {
          const attachmentItem = document.createElement("li");
          attachmentItem.textContent = attachment;
          attachmentsList.appendChild(attachmentItem);
        });
        documentCard.appendChild(attachmentsList);

        container.appendChild(listItem);
      },
    );

    return container;
  }
}

export default DocumentsGridComponent;
