import Component from "../../../components/Component";
import HeadingComponent from "../../../components/Heading/Heading";
import type { DocumentViewModel } from "../../viewModel/types";
import styles from "./DocumentRow.module.css";

type DocumentRowComponentProps = {
  document: DocumentViewModel;
};

class DocumentRowComponent extends Component<DocumentRowComponentProps> {
  render(): HTMLElement {
    const { name, version, contributors, attachments } = this.props.document;

    const row = document.createElement("tr");
    row.className = styles.document;

    const nameCell = document.createElement("td");
    nameCell.className = styles.document__cell;
    const documentNameHeading = new HeadingComponent({
      level: 2,
      text: name,
      className: styles.document__name,
    });
    nameCell.appendChild(documentNameHeading.getElement());
    const documentVersion = document.createElement("span");
    documentVersion.textContent = `Version: ${version}`;
    nameCell.appendChild(documentVersion);
    row.appendChild(nameCell);

    const contributorsCell = document.createElement("td");
    contributorsCell.className = styles.document__cell;
    const contributorsList = document.createElement("ul");
    contributorsList.className = styles.document__list;
    contributors.forEach((contributor) => {
      const contributorItem = document.createElement("li");
      contributorItem.textContent = contributor;
      contributorsList.appendChild(contributorItem);
    });
    contributorsCell.appendChild(contributorsList);
    row.appendChild(contributorsCell);

    const attachmentsCell = document.createElement("td");
    attachmentsCell.className = styles.document__cell;
    const attachmentsList = document.createElement("ul");
    attachmentsList.className = styles.document__list;
    attachments.forEach((attachment) => {
      const attachmentItem = document.createElement("li");
      attachmentItem.textContent = attachment;
      attachmentsList.appendChild(attachmentItem);
    });
    attachmentsCell.appendChild(attachmentsList);
    row.appendChild(attachmentsCell);

    return row;
  }
}

export default DocumentRowComponent;
