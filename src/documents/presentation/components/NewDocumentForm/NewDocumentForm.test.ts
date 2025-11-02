import { screen } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

const user = userEvent.setup();

import { render } from "@shared/testing/testUtils";

import NewDocumentFormComponent from "./NewDocumentForm";

describe("NewDocumentForm Component", () => {
  it("should render the form correctly", () => {
    const newDocumentForm = new NewDocumentFormComponent({});

    render(newDocumentForm);

    const nameInput = screen.getByLabelText(/^name/i);
    const versionInput = screen.getByLabelText(/^version/i);
    const contributorsInput = screen.getByLabelText(/^contributors/i);
    const attachmentsInput = screen.getByLabelText(/^attachments/i);
    const submitButton = screen.getByRole("button", {
      name: /create document/i,
    });

    expect(nameInput).toBeInTheDocument();
    expect(versionInput).toBeInTheDocument();
    expect(contributorsInput).toBeInTheDocument();
    expect(attachmentsInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
  });

  it("should call onSubmit with correct data when form is submitted", async () => {
    const documentName = "Test Document";
    const documentVersion = "1.0.13";

    const mockOnSubmit = vi.fn();
    const newDocumentForm = new NewDocumentFormComponent({
      onSubmit: mockOnSubmit,
    });

    render(newDocumentForm);

    const nameInput = screen.getByLabelText(/^name/i);
    await user.type(nameInput, documentName);

    const versionInput = screen.getByLabelText(/version/i);
    await user.type(versionInput, documentVersion);

    const submitButton = screen.getByRole("button", {
      name: /create document/i,
    });
    await user.click(submitButton);

    expect(mockOnSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        name: documentName,
        version: documentVersion,
      }),
    );
  });

  it("should not call onSubmit when form is invalid", async () => {
    const mockOnSubmit = vi.fn();
    const newDocumentForm = new NewDocumentFormComponent({
      onSubmit: mockOnSubmit,
    });

    render(newDocumentForm);

    const submitButton = screen.getByRole("button", {
      name: /create document/i,
    });
    await user.click(submitButton);

    expect(mockOnSubmit).not.toHaveBeenCalled();
  });
});
