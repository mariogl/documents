import Component from "../../../shared/components/Component";
import type { DocumentViewModel } from "../../viewModel/types";
import DocumentLayout from "./layouts/DocumentLayout";
import type { LayoutType } from "./types";

import styles from "./DocumentItem.module.css";

type DocumentItemComponentProps = {
  document: DocumentViewModel;
  layoutType: LayoutType;
};

class DocumentItemComponent extends Component<DocumentItemComponentProps> {
  protected render(): Element {
    const { name, version, contributors, attachments } = this.props.document;

    const documentName = document.createElement("h2");
    documentName.className = styles.document__name;
    documentName.textContent = name;

    const documentVersion = document.createElement("span");
    documentVersion.textContent = `Version: ${version}`;

    const documentContributorsList = document.createElement("ul");
    documentContributorsList.className = styles.document__list;
    contributors.forEach((contributor) => {
      const contributorItem = document.createElement("li");
      contributorItem.textContent = contributor;
      documentContributorsList.appendChild(contributorItem);
    });

    const documentAttachmentsList = document.createElement("ul");
    documentAttachmentsList.className = styles.document__list;
    attachments.forEach((attachment) => {
      const attachmentItem = document.createElement("li");
      attachmentItem.textContent = attachment;
      documentAttachmentsList.appendChild(attachmentItem);
    });

    const layout = new DocumentLayout({
      name: documentName,
      version: documentVersion,
      contributors: documentContributorsList,
      attachments: documentAttachmentsList,
    });

    const layouts: Record<LayoutType, () => HTMLElement> = {
      grid: layout.generateCardLayout.bind(layout),
      list: layout.generateRowLayout.bind(layout),
    };

    return layouts[this.props.layoutType]();
  }
}

export default DocumentItemComponent;
