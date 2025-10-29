import type { DocumentViewModel } from "../../../viewModel/types";
import DocumentItemComponent from "../../DocumentItem/DocumentItem";

import gridLayoutStyles from "./DocumentsGrid.module.css";
import listLayoutStyles from "./DocumentsList.module.css";

class DocumentsLayout {
  constructor(private documents: DocumentViewModel[]) {}

  generateListLayout(): HTMLElement {
    const container = document.createElement("table");
    container.className = listLayoutStyles.documents;

    const thead = document.createElement("thead");
    thead.className = listLayoutStyles.documents__head;

    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");

    const nameHeader = document.createElement("th");
    nameHeader.className = listLayoutStyles.documents__header;
    nameHeader.textContent = "Name";
    headerRow.appendChild(nameHeader);

    const contributorsHeader = document.createElement("th");
    contributorsHeader.className = listLayoutStyles.documents__header;
    contributorsHeader.textContent = "Contributors";
    headerRow.appendChild(contributorsHeader);

    const attachmentsHeader = document.createElement("th");
    attachmentsHeader.className = listLayoutStyles.documents__header;
    attachmentsHeader.textContent = "Attachments";
    headerRow.appendChild(attachmentsHeader);

    thead.appendChild(headerRow);
    container.appendChild(thead);

    this.documents.forEach((doc) => {
      const row = new DocumentItemComponent({
        document: doc,
        layoutType: "list",
      }).getElement();

      tbody.appendChild(row);
    });

    container.appendChild(tbody);

    return container;
  }

  generateGridLayout(): HTMLElement {
    const container = document.createElement("ul");
    container.className = gridLayoutStyles.documents;

    this.documents.forEach((doc) => {
      const listItem = document.createElement("li");

      const documentCard = new DocumentItemComponent({
        document: doc,
        layoutType: "grid",
      }).getElement();

      listItem.appendChild(documentCard);
      container.appendChild(listItem);
    });

    return container;
  }
}

export default DocumentsLayout;
