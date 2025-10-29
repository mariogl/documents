import type { DocumentDto } from "../dto/types";
import type { DocumentViewModel } from "../viewModel/types";
import type { DocumentsClient } from "./types";

abstract class BaseDocumentsClient implements DocumentsClient {
  abstract getDocuments(): Promise<DocumentViewModel[]>;

  protected mapDocumentDtoToViewModel(
    documentDto: DocumentDto,
  ): DocumentViewModel {
    return {
      id: documentDto.ID,
      name: documentDto.Title,
      contributors: documentDto.Contributors.map(
        (contributor) => contributor.Name,
      ),
      attachments: documentDto.Attachments,
      version: documentDto.Version,
    };
  }
}

export default BaseDocumentsClient;
