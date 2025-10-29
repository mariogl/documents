import Component from "../../../components/Component";
import type { ComponentProps } from "../../../components/types";

type DocumentsProps = {
  documents: {
    id: string;
    name: string;
    contributors: string[];
    attachments: string[];
  }[];
};

class DocumentsList extends Component<DocumentsProps> {
  constructor(props: ComponentProps<DocumentsProps>) {
    super(props);
  }

  render(): HTMLElement {
    const container = document.createElement("table");
    const thead = document.createElement("thead");
    const tbody = document.createElement("tbody");

    const headerRow = document.createElement("tr");

    const nameHeader = document.createElement("th");
    nameHeader.textContent = "Name";
    headerRow.appendChild(nameHeader);

    const contributorsHeader = document.createElement("th");
    contributorsHeader.textContent = "Contributors";
    headerRow.appendChild(contributorsHeader);

    const attachmentsHeader = document.createElement("th");
    attachmentsHeader.textContent = "Attachments";
    headerRow.appendChild(attachmentsHeader);

    thead.appendChild(headerRow);
    container.appendChild(thead);

    this.props.documents.forEach(({ name, contributors, attachments }) => {
      const row = document.createElement("tr");

      const nameCell = document.createElement("td");
      nameCell.textContent = name;
      row.appendChild(nameCell);

      const contributorsCell = document.createElement("td");
      contributorsCell.textContent = contributors.join(", ");
      row.appendChild(contributorsCell);

      const attachmentsCell = document.createElement("td");
      attachmentsCell.textContent = attachments.join(", ");
      row.appendChild(attachmentsCell);

      tbody.appendChild(row);
    });

    container.appendChild(tbody);

    return container;
  }
}

export default DocumentsList;
