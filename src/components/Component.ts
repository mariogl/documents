import type { ComponentProps } from "./types";

abstract class Component<
  Props extends Record<string, unknown> = Record<string, unknown>,
> {
  protected element: HTMLElement | null = null;

  constructor(protected props: ComponentProps<Props>) {}

  protected abstract render(): void;

  protected setElement(element: HTMLElement): void {
    if (this.element && this.element.parentElement) {
      this.element.parentElement.replaceChild(element, this.element);
    }

    this.element = element;
  }

  getElement(): HTMLElement {
    if (!this.element) {
      this.render();
    }

    return this.element as HTMLElement;
  }
}

export default Component;
