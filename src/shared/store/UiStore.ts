import Context from "../context/Context";

export const uiContext = new Context<{
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}>();

class UiStore {
  private isLoading = false;
  private listeners = new Set<() => void>();

  startLoading(): void {
    this.isLoading = true;
    this.notifyListeners();
  }

  stopLoading(): void {
    this.isLoading = false;
    this.notifyListeners();
  }

  getIsLoading(): boolean {
    return this.isLoading;
  }

  subscribe(listener: () => void) {
    this.listeners.add(listener);
  }

  notifyListeners() {
    this.listeners.forEach((listener) => listener());
  }
}

export const uiStore = new UiStore();
