import { useState } from "react";

type Errors<T> = Partial<Record<keyof T, string>>;
type Validators<T> = Partial<Record<keyof T, (value: any) => string>>;

export default function useForm<T extends Record<string, any>>(
  initialValues: T,
  validators: Validators<T>,
  onSubmit: (values: T) => void
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Errors<T>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));

    if (validators[name]) {
      const errorMessage = validators[name]!(value);
      setErrors((prev) => ({ ...prev, [name]: errorMessage }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let newErrors: Errors<T> = {};
    (Object.keys(validators) as (keyof T)[]).forEach((key) => {
      const validator = validators[key];
      if (validator) {
        const errorMessage = validator(values[key]);
        if (errorMessage) {
          newErrors[key] = errorMessage;
        }
      }
    });

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      onSubmit(values);
    }
  };

  return { values, errors, handleChange, handleSubmit };
}
