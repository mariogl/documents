export type Document = {
  id: string;
  name: string;
  contributors: string[];
  attachments: string[];
  version: string;
  createdAt: Date;
  relativeCreatedAt: string;
};

export type NewDocumentData = Omit<Document, "id" | "relativeCreatedAt">;
