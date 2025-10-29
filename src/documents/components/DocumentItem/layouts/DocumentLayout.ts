import type { DocumentItemSlots } from "../types";

import cardLayoutStyles from "./DocumentCard.module.css";
import rowLayoutStyles from "./DocumentRow.module.css";

class DocumentLayout {
  constructor(private slots: DocumentItemSlots) {}

  generateCardLayout(): HTMLElement {
    const { name, version, contributors, attachments } = this.slots;

    const card = document.createElement("article");
    card.className = cardLayoutStyles.document;

    const header = document.createElement("header");
    header.className = cardLayoutStyles.document__header;
    card.appendChild(header);

    header.appendChild(name);
    header.appendChild(version);

    const contributorsSection = document.createElement("section");
    card.appendChild(contributorsSection);

    contributorsSection.appendChild(contributors);

    const attachmentsSection = document.createElement("section");
    card.appendChild(attachmentsSection);

    attachmentsSection.appendChild(attachments);

    return card;
  }

  generateRowLayout(): HTMLElement {
    const { name, version, contributors, attachments } = this.slots;

    const row = document.createElement("tr");
    row.className = rowLayoutStyles.document;

    const nameCell = document.createElement("td");
    nameCell.className = rowLayoutStyles.document__cell;

    nameCell.appendChild(name);
    nameCell.appendChild(version);
    row.appendChild(nameCell);

    const contributorsCell = document.createElement("td");
    contributorsCell.className = rowLayoutStyles.document__cell;

    contributorsCell.appendChild(contributors);
    row.appendChild(contributorsCell);

    const attachmentsCell = document.createElement("td");
    attachmentsCell.className = rowLayoutStyles.document__cell;

    attachmentsCell.appendChild(attachments);
    row.appendChild(attachmentsCell);

    return row;
  }
}

export default DocumentLayout;
