import type { DocumentDto } from "../dto/types";
import {
  marketingPlanDocumentDtoFixture,
  q1ReportDocumentDtoFixture,
  userResearchDocumentDtoFixture,
} from "../fixtures/documentsFixtures";
import type { DocumentViewModel } from "../viewModel/types";
import BaseDocumentsClient from "./BaseDocumentsClient";

class FakeDocumentsClient extends BaseDocumentsClient {
  async getDocuments(): Promise<DocumentViewModel[]> {
    const documentsDto: DocumentDto[] = [
      q1ReportDocumentDtoFixture,
      userResearchDocumentDtoFixture,
      marketingPlanDocumentDtoFixture,
    ];

    return documentsDto.map(this.mapDocumentDtoToViewModel);
  }
}

export default FakeDocumentsClient;
