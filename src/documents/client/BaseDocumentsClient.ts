import type { DocumentDto } from "@documents/dto/types";
import type { Document, NewDocumentData } from "@documents/types";
import { getRelativeDateString } from "@shared/dates/helpers";

import type { DocumentsClient } from "./types";

abstract class BaseDocumentsClient implements DocumentsClient {
  abstract getDocuments(): Promise<Document[]>;

  abstract saveDocument(document: NewDocumentData): Promise<Document>;

  protected mapDocumentDtoToViewModel(documentDto: DocumentDto): Document {
    return {
      id: documentDto.ID,
      name: documentDto.Title,
      contributors: documentDto.Contributors.map(
        (contributor) => contributor.Name,
      ),
      attachments: documentDto.Attachments,
      version: documentDto.Version,
      createdAt: new Date(documentDto.CreatedAt),
      relativeCreatedAt: getRelativeDateString(new Date(documentDto.CreatedAt)),
    };
  }
}

export default BaseDocumentsClient;
