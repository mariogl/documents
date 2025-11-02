import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

import { render } from "@shared/testing/testUtils";

import ListBoxComponent from "./ListBox";

const user = userEvent.setup();

describe("ListBox component", () => {
  it("should render correctly", async () => {
    const label = "Student names";

    const listBox = new ListBoxComponent({
      label,
      id: "student-names",
      onChange: () => {},
    });

    render(listBox);

    const input = screen.getByLabelText(label);

    expect(input).toBeInTheDocument();
  });

  it("should call onChange with correct values", async () => {
    const tags = [
      "DomainDrivenDesign",
      "TestDrivenDevelopment",
      "BehaviourDrivenDevelopment",
    ];
    const label = "Tags";
    const onChange = vi.fn();

    const listBox = new ListBoxComponent({
      label,
      id: "tags",
      onChange,
    });

    render(listBox);

    const input = screen.getByLabelText(label);
    await user.type(input, tags.join(", "));

    await user.tab();

    expect(onChange).toHaveBeenCalledWith(tags);
  });

  it("should handle empty value correctly", async () => {
    const label = "Tags";
    const onChange = vi.fn();

    const listBox = new ListBoxComponent({
      label,
      id: "tags",
      onChange,
    });

    render(listBox);

    const input = screen.getByLabelText(label);

    await user.type(input, " , , ");
    await user.tab();

    expect(onChange).toHaveBeenCalledWith([]);
  });
});
