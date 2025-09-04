import { renderHook, act } from "@testing-library/react";
import useForm from "./useForm";

describe("useForm hook", () => {
  const initialValues = { name: "", email: "" };
  const validators = {
    name: (value: any) => (!value ? "Name is required" : ""),
    email: (value: any) =>
      /\S+@\S+\.\S+/.test(value) ? "" : "Email is invalid",
  };
  const onSubmit = jest.fn();

  it("should update values on change", () => {
    const { result } = renderHook(() =>
      useForm(initialValues, validators, onSubmit)
    );

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "John" },
      } as any);
    });

    expect(result.current.values.name).toBe("John");
  });

  it("should show error for invalid email", () => {
    const { result } = renderHook(() =>
      useForm(initialValues, validators, onSubmit)
    );

    act(() => {
      result.current.handleChange({
        target: { name: "email", value: "invalid" },
      } as any);
    });

    expect(result.current.errors.email).toBe("Email is invalid");
  });

  it("should call onSubmit if form is valid", () => {
    const { result } = renderHook(() =>
      useForm(initialValues, validators, onSubmit)
    );

    act(() => {
      result.current.handleChange({
        target: { name: "name", value: "Jane" },
      } as any);
      result.current.handleChange({
        target: { name: "email", value: "jane@email.com" },
      } as any);
    });

    act(() => {
      result.current.handleSubmit({ preventDefault: jest.fn() } as any);
    });

    expect(onSubmit).toHaveBeenCalledWith({
      name: "Jane",
      email: "jane@email.com",
    });
  });
});
