import type { Document } from "../types";
import BaseDocumentsClient from "./BaseDocumentsClient";

class BrowserDocumentsClient extends BaseDocumentsClient {
  async getDocuments(): Promise<Document[]> {
    throw new Error("Method not implemented.");
  }

  async saveDocument(): Promise<Document> {
    throw new Error("Method not implemented.");
  }
}

export default BrowserDocumentsClient;
