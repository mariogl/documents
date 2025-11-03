export type DocumentDto = {
  Attachments: string[];
  Contributors: {
    ID: string;
    Name: string;
  }[];
  ID: string;
  Title: string;
  Version: string;
  CreatedAt: string;
};
