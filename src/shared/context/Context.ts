class Context<ValueType> {
  private value: ValueType | null = null;

  provide(value: ValueType): void {
    this.value = value;
  }

  consume(): ValueType {
    if (this.value === null) {
      throw new Error("Context: No value provided");
    }

    return this.value;
  }

  reset(): void {
    this.value = null;
  }
}

export default Context;
