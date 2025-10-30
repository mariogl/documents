import type { DocumentsSorter } from "../sorters/types";
import type { DocumentViewModel } from "../viewModel/types";

class VersionSorter implements DocumentsSorter {
  sort(documentA: DocumentViewModel, documentB: DocumentViewModel): number {
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
