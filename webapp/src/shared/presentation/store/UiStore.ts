import Store from "../../application/store/Store";

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
