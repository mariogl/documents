import Context from "@shared/application/context/Context";

import Store from "./Store";

export const uiContext = new Context<{
  isLoading: boolean;
  startLoading: () => void;
  stopLoading: () => void;
}>();

class UiStore extends Store {
  private isLoading = false;

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
}

export const uiStore = new UiStore();
