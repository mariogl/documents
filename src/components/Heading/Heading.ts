import Component from "../Component";
import type { ComponentProps } from "../types";

type HeadingComponentProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

class HeadingComponent extends Component<HeadingComponentProps> {
  constructor(props: ComponentProps<HeadingComponentProps>) {
    super(props);
  }

  render(): void {
    const heading = document.createElement(`h${this.props.level}`);

    const baseClassName = "heading";

    heading.className = this.props.className
      ? `${baseClassName} ${this.props.className}`
      : baseClassName;

    heading.textContent = this.props.text;

    this.setElement(heading);
  }
}

export default HeadingComponent;
