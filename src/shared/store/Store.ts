class Store {
  private listeners = new Set<() => void>();

  subscribe(listener: () => void) {
    this.listeners.add(listener);
  }

  protected notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export default Store;
