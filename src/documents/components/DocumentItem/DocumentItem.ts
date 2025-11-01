import Component from "../../../shared/components/Component";
import type { Document } from "../../types";
import DocumentLayout from "./layouts/DocumentLayout";
import type { LayoutType } from "./types";

import styles from "./DocumentItem.module.css";

type DocumentItemComponentProps = {
  document: Document;
  layoutType: LayoutType;
};

class DocumentItemComponent extends Component<DocumentItemComponentProps> {
  protected render(): Element {
    const documentName = this.createDocumentName();
    const documentVersion = this.createDocumentVersion();
    const documentRelativeCreatedAt = this.createRelativeCreatedAt();
    const documentContributorsList = this.createDocumentContributorList();
    const documentAttachmentsList = this.createDocumentAttachmentsList();

    const layout = new DocumentLayout({
      name: documentName,
      version: documentVersion,
      relativeCreatedAt: documentRelativeCreatedAt,
      contributors: documentContributorsList,
      attachments: documentAttachmentsList,
    });

    const layouts: Record<LayoutType, () => HTMLElement> = {
      grid: layout.generateCardLayout.bind(layout),
      list: layout.generateRowLayout.bind(layout),
    };

    return layouts[this.props.layoutType]();
  }

  private createDocumentName() {
    const documentName = document.createElement("h2");
    documentName.className = styles.document__name;
    documentName.textContent = this.props.document.name;

    return documentName;
  }

  private createDocumentVersion() {
    const documentVersion = document.createElement("span");
    documentVersion.textContent = `Version: ${this.props.document.version}`;

    return documentVersion;
  }

  private createRelativeCreatedAt() {
    const documentCreatedAt = document.createElement("span");
    documentCreatedAt.className = styles.document__subheading;
    documentCreatedAt.textContent = `Created: ${this.props.document.relativeCreatedAt}`;

    return documentCreatedAt;
  }

  private createDocumentContributorList() {
    const documentContributorsList = document.createElement("ul");
    documentContributorsList.className = styles.document__list;
    this.props.document.contributors.forEach((contributor) => {
      const contributorItem = document.createElement("li");
      contributorItem.textContent = contributor;
      documentContributorsList.appendChild(contributorItem);
    });
    return documentContributorsList;
  }

  private createDocumentAttachmentsList() {
    const documentAttachmentsList = document.createElement("ul");
    documentAttachmentsList.className = styles.document__list;
    this.props.document.attachments.forEach((attachment) => {
      const attachmentItem = document.createElement("li");
      attachmentItem.textContent = attachment;
      documentAttachmentsList.appendChild(attachmentItem);
    });
    return documentAttachmentsList;
  }
}

export default DocumentItemComponent;
