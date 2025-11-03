import type { Document } from "@documents/domain/types";

import type { DocumentsSorter } from "./types";

class VersionSorter implements DocumentsSorter {
  sort(documentA: Document, documentB: Document): number {
    const versionANumbers = documentA.version.split(".").map(Number);
    const versionBNumbers = documentB.version.split(".").map(Number);

    for (
      let i = 0;
      i < Math.max(versionANumbers.length, versionBNumbers.length);
      i++
    ) {
      const versionANumber = versionANumbers[i] || 0;
      const versionBNumber = versionBNumbers[i] || 0;

      if (versionANumber !== versionBNumber) {
        return versionANumber - versionBNumber;
      }
    }

    return 0;
  }
}

export default VersionSorter;
