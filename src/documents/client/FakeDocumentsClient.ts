import type { DocumentDto } from "../dto/types";
import type { DocumentViewModel } from "../viewModel/types";
import type { DocumentsClient } from "./types";

class FakeDocumentsClient implements DocumentsClient {
  async getDocuments(): Promise<DocumentViewModel[]> {
    const documentsDto: DocumentDto[] = [
      {
        Attachments: ["European Amber Lager", "Wood-aged Beer"],
        Contributors: [
          {
            ID: "1b41861e-51e2-4bf4-ba13-b20f01ce81ef",
            Name: "Jasen Crona",
          },
          {
            ID: "2a1d6ed0-7d2d-4dc6-b3ea-436a38fd409e",
            Name: "Candace Jaskolski",
          },
          {
            ID: "9ae28565-4a1c-42e3-9ae8-e39e6f783e14",
            Name: "Rosemarie Schaden",
          },
        ],
        ID: "69517c79-a4b2-4f64-9c83-20e5678e4519",
        Title: "Arrogant Bastard Ale",
      },
    ];

    return documentsDto.map(this.mapDocumentDtoToViewModel);
  }

  private mapDocumentDtoToViewModel(
    documentDto: DocumentDto,
  ): DocumentViewModel {
    return {
      id: documentDto.ID,
      name: documentDto.Title,
      contributors: documentDto.Contributors.map(
        (contributor) => contributor.Name,
      ),
      attachments: documentDto.Attachments,
    };
  }
}

export default FakeDocumentsClient;
