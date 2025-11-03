import Component from "../Component";
import TextboxComponent from "../Textbox/Textbox";

type ListBoxComponentProps = Partial<HTMLInputElement> & {
  label: string;
  id: string;
  onChange: (values: string[]) => void;
};

class ListBoxComponent extends Component<ListBoxComponentProps> {
  private values: string[] = [];

  protected render(): Element {
    const input = new TextboxComponent({
      ...this.props,
      type: "text",
    }).getElement();

    input.addEventListener("change", (event) => {
      const target = event.target as HTMLInputElement;
      this.values = target.value
        .split(",")
        .map((value) => value.trim())
        .filter((value) => value !== "");
      this.props.onChange(this.values);
    });

    return input;
  }
}

export default ListBoxComponent;
