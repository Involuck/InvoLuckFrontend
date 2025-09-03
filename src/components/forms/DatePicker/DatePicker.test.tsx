import { render, screen, fireEvent } from "@testing-library/react";
import CustomDatePicker from "./DatePicker";

describe("CustomDatePicker", () => {
  it("renders with default label", () => {
    render(<CustomDatePicker />);
    expect(screen.getByText("Select a date")).toBeInTheDocument();
  });

  it("renders with custom label", () => {
    render(<CustomDatePicker label="Birthday" />);
    expect(screen.getByText("Birthday")).toBeInTheDocument();
  });

  it("calls onChange when a date is selected", () => {
    const handleChange = jest.fn();
    render(<CustomDatePicker onChange={handleChange} />);

    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "01/01/2025" } });

    expect(input).toHaveValue("01/01/2025");
  });
});
