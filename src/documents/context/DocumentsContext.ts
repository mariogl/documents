import type DocumentsService from "../services/DocumentsService";

class DocumentsContext<ValueType> {
  private value: ValueType | null = null;

  provide(value: ValueType): void {
    this.value = value;
  }

  consume(): ValueType {
    if (this.value === null) {
      throw new Error("DocumentsContext: No value provided");
    }

    return this.value;
  }

  reset(): void {
    this.value = null;
  }
}
export const documentsServiceContext = new DocumentsContext<DocumentsService>();
