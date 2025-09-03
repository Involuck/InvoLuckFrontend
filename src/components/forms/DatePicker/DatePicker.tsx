'use client';

import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Props = {
  label?: string;
  dateFormat?: string; // format e.g. "dd/MM/yyyy"
  onChange?: (date: Date | null) => void;
};

export default function CustomDatePicker({
  label = 'Select a date',
  dateFormat = 'dd/MM/yyyy',
  onChange
}: Props) {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleChange = (date: Date | null) => {
    setStartDate(date);
    onChange?.(date);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-sm font-medium text-gray-700">{label}</label>
      )}
      <DatePicker
        selected={startDate}
        onChange={handleChange}
        dateFormat={dateFormat}
        className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
}
