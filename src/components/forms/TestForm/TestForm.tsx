"use client";

import React from "react";
import useForm from "@/hooks/forms/useForm";

export default function TestForm() {
  const { values, errors, handleChange, handleSubmit } = useForm(
    { name: "", email: "" },
    {
      name: (value: any) => (!value ? "Name is required" : ""),
      email: (value: any) =>
        !/\S+@\S+\.\S+/.test(value) ? "Email is invalid" : "",
    },
    (formValues) => {
      console.log("Form submitted with values:", formValues);
      alert(`Submitted: ${JSON.stringify(formValues, null, 2)}`);
    }
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 p-4 border rounded-md shadow-md w-96 bg-white"
    >
      <h2 className="text-xl font-bold">Test Form</h2>

      {/* Name field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name}</p>
        )}
      </div>

      {/* Email field */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          className="mt-1 block w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm mt-1">{errors.email}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
      >
        Submit
      </button>
    </form>
  );
}
