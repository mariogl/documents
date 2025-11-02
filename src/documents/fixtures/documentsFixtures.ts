import type { Document } from "@documents/types";

import DocumentsFixtureFactory from "./DocumentsFixtureFactory";

export const q1ReportDocumentDtoFixture =
  DocumentsFixtureFactory.createDocumentDtoFixture({
    Title: "Q1 Report",
  });

export const userResearchDocumentDtoFixture =
  DocumentsFixtureFactory.createDocumentDtoFixture({
    Title: "User Research",
  });

export const marketingPlanDocumentDtoFixture =
  DocumentsFixtureFactory.createDocumentDtoFixture({
    Title: "Marketing Plan",
  });

export const cvDocumentFixture: Document =
  DocumentsFixtureFactory.createDocumentFixture({
    name: "CV - Danielle Rossi",
  });

export const coverLetterDocumentFixture: Document =
  DocumentsFixtureFactory.createDocumentFixture({
    name: "Cover Letter - Danielle Rossi",
  });

export const documentsDtoFixture = [
  q1ReportDocumentDtoFixture,
  userResearchDocumentDtoFixture,
  marketingPlanDocumentDtoFixture,
];
