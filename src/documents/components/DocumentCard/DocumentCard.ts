import Component from "../../../components/Component";
import type { DocumentViewModel } from "../../viewModel/types";
import styles from "./DocumentCard.module.css";

type DocumentCardProps = {
  document: DocumentViewModel;
};

class DocumentCardComponent extends Component<DocumentCardProps> {
  render(): HTMLElement {
    const { name, contributors, attachments, version } = this.props.document;

    const card = document.createElement("article");
    card.className = styles.document;

    const header = document.createElement("header");
    header.className = styles.document__header;
    card.appendChild(header);

    const documentName = document.createElement("h2");
    documentName.className = styles.document__name;
    documentName.textContent = name;
    header.appendChild(documentName);

    const documentVersion = document.createElement("span");
    documentVersion.textContent = `Version: ${version}`;
    header.appendChild(documentVersion);

    const contributorsSection = document.createElement("section");
    card.appendChild(contributorsSection);

    const contributorsList = document.createElement("ul");
    contributorsList.className = styles.document__list;
    contributors.forEach((contributor) => {
      const contributorItem = document.createElement("li");
      contributorItem.textContent = contributor;
      contributorsList.appendChild(contributorItem);
    });
    contributorsSection.appendChild(contributorsList);

    const attachmentsList = document.createElement("ul");
    attachmentsList.className = styles.document__list;
    attachments.forEach((attachment) => {
      const attachmentItem = document.createElement("li");
      attachmentItem.textContent = attachment;
      attachmentsList.appendChild(attachmentItem);
    });
    card.appendChild(attachmentsList);

    return card;
  }
}

export default DocumentCardComponent;
