import Component from "../Component";

type HeadingComponentProps = {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  text: string;
};

class HeadingComponent extends Component<HeadingComponentProps> {
  render(): HTMLElement {
    const heading = document.createElement(`h${this.props.level}`);

    const baseClassName = "heading";

    heading.className = this.props.className
      ? `${baseClassName} ${this.props.className}`
      : baseClassName;

    heading.textContent = this.props.text;

    return heading;
  }
}

export default HeadingComponent;
