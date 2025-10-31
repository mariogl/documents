import type { DocumentDto } from "../dto/types";
import {
  marketingPlanDocumentDtoFixture,
  q1ReportDocumentDtoFixture,
  userResearchDocumentDtoFixture,
} from "../fixtures/documentsFixtures";
import type { Document, NewDocumentData } from "../types";
import BaseDocumentsClient from "./BaseDocumentsClient";

class FakeDocumentsClient extends BaseDocumentsClient {
  async getDocuments(): Promise<Document[]> {
    const documentsDto: DocumentDto[] = [
      q1ReportDocumentDtoFixture,
      userResearchDocumentDtoFixture,
      marketingPlanDocumentDtoFixture,
    ];

    return documentsDto.map(this.mapDocumentDtoToViewModel);
  }

  async saveDocument(_newDocumentData: NewDocumentData): Promise<Document> {
    throw new Error("Method not implemented.");
  }
}

export default FakeDocumentsClient;
